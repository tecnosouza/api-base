import { Column, DataTable } from "@/components/ui/data-table";
import { PageHeader } from "@/components/ui/page-header";
import { useToast } from "@/hooks/use-toast";
import { useAdvancedTable } from "@/hooks/useAdvancedTable";
import { useApiQuery } from "@/hooks/useApiQuery";
import { categoriesService } from "@/services/categoriesService";
import { ProductRequest, productsService } from "@/services/productsService";
import { Eye, Plus, Trash } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";

interface Category {
  id: number;
  title: string;
}

interface Product {
  id?: number;
  model: string;
  description: string;
  values: string;
  price: number | string;
  applications: string;
  is_active: boolean;
  created_at?: string;
  category_id?: number;
  category?: {
    id: number;
    title: string;
    title_menu: string;
    description: string;
    is_active: boolean;
  };
  image?: File | string | null;
  photo_link?: string;
}

const Products = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  const [formData, setFormData] = useState<Product>({
    model: "",
    description: "",
    values: "",
    price: "",
    applications: "",
    is_active: true,
    category_id: undefined,
    image: undefined,
  });

  const [initialData, setInitialData] = useState<Product | null>(null);
  const { toast } = useToast();

  const {
    tableState,
    limitOptions,
    updatePage,
    updateLimit,
    updateFilter,
    updateSort,
    resetFilters,
    getApiParams,
  } = useAdvancedTable({ initialLimit: 10, limitOptions: [10, 25, 50] });

  const memoizedGetApiParams = useCallback(getApiParams, [tableState, getApiParams]);

  const { data: products, pagination: paginationData, loading, error, refetch, updateParams } =
    useApiQuery({ queryFn: productsService.getAll, initialParams: memoizedGetApiParams });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoriesService.getAll({});
        setCategories(response?.data ?? []);
      } catch (err) {
        console.error("Erro ao carregar categorias:", err);
        toast({ title: "Erro", description: "Falha ao carregar categorias.", color: "error" });
      }
    };
    fetchCategories();
  }, [toast]);

  useEffect(() => {
    updateParams(memoizedGetApiParams());
  }, [memoizedGetApiParams, updateParams]);

  const handleNew = () => {
    setEditingProduct(null);
    setFormData({
      model: "",
      description: "",
      values: "",
      price: "",
      applications: "",
      is_active: true,
      category_id: undefined,
      image: undefined,
    });
    setInitialData(null);
    setShowModal(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      model: product.model,
      description: product.description,
      values: product.values,
      price: product.price,
      applications: product.applications,
      is_active: product.is_active,
      category_id: product.category_id,
      image: product.image,
    });
    setInitialData({
      model: product.model,
      description: product.description,
      values: product.values,
      price: product.price,
      applications: product.applications,
      is_active: product.is_active,
      category_id: product.category_id,
      image: product.image,
    });
    setShowModal(true);
  };

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;
    try {
      await productsService.delete(productToDelete.id!.toString());
      toast({ title: "Sucesso", description: "Produto excluído com sucesso!" });
      setShowDeleteModal(false);
      setProductToDelete(null);
      refetch();
    } catch (error: any) {
      const messages = error?.response?.data?.errors?.map((e: any) => e.msg)?.join("\n");
      toast({ title: "Erro", description: messages ?? "Erro ao excluir produto.", color: "error" });
      console.error(error);
    }
  };

  const hasChanges = editingProduct && initialData && JSON.stringify(formData) !== JSON.stringify(initialData);

  const allFieldsFilled =
    formData.model.trim() &&
    formData.description.trim() &&
    formData.values.trim() &&
    formData.price &&
    formData.applications.trim() &&
    formData.category_id;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const parsedPrice = formData.price
        ? Number(String(formData.price).replace(/[^\d,.-]/g, "").replace(",", "."))
        : 0;

      if (editingProduct) {
        const updatedFields: Partial<ProductRequest> = {};
        Object.keys(formData).forEach((key) => {
          const currentValue = formData[key as keyof Product];
          const initialValue = initialData?.[key as keyof Product];

          if (currentValue !== initialValue) {
            if (key === "image" && currentValue instanceof File) {
              updatedFields.image = currentValue;
            } else if (key === "price") {
              updatedFields.price = parsedPrice;
            } else if (key !== "image" && currentValue !== undefined && currentValue !== null) {
              (updatedFields as any)[key] = currentValue;
            }
          }
        });

        await productsService.update(editingProduct.id!.toString(), updatedFields);
        toast({ title: "Sucesso", description: "Produto atualizado com sucesso!" });
      } else {
        const newProductData: ProductRequest = {
          model: formData.model,
          description: formData.description,
          values: formData.values,
          price: parsedPrice,
          applications: formData.applications,
          is_active: formData.is_active,
          category_id: formData.category_id!,
          image: formData.image instanceof File ? formData.image : undefined,
        };
        await productsService.create(newProductData);
        toast({ title: "Sucesso", description: "Produto criado com sucesso!" });
      }

      setShowModal(false);
      refetch();
    } catch (error: any) {
      const messages = error?.response?.data?.errors?.map((e: any) => e.msg)?.join("\n");
      toast({ title: "Erro", description: messages ?? "Erro ao salvar produto.", color: "error" });
      console.error(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, type, value: rawValue } = e.target;
    let value: string | boolean | File | number | undefined = rawValue;

    if (type === "checkbox") {
      value = (e.target as HTMLInputElement).checked;
    } else if (type === "file") {
      value = (e.target as HTMLInputElement).files?.[0];
    } else if (name === "price") {
      // Remove tudo que não é número
      const onlyNumbers = rawValue.replace(/\D/g, "");

      if (onlyNumbers) {
        // Divide por 100 para representar centavos e formata
        const numericValue = parseFloat(onlyNumbers) / 100;
        value = numericValue;
      } else {
        value = 0;
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const columns: Column[] = [
    {
      key: "photo_link",
      label: "Imagem",
      render: (_, row: Product) =>
        row.photo_link ? (
          <img
            src={row.photo_link}
            alt="Miniatura do Produto"
            className="h-10 w-10 object-cover rounded-md"
          />
        ) : (
          <span className="text-sm text-gray-500">Sem imagem</span>
        ),
    },
    {
      key: "category",
      label: "Categoria",
      sortable: true,
      render: (_, row: Product) => <span>{row.category?.title_menu}</span>,
    },
    { key: "model", label: "Modelo", filterable: true, sortable: true },
    { key: "description", label: "Descrição", filterable: true, sortable: false },
    {
      key: "price",
      label: "Preço",
      filterable: true,
      sortable: false,
      render: (_, row: Product) => {
        const priceNumber = Number(String(row.price).replace(/[^\d.-]/g, ""));
        const formatted = priceNumber
          ? priceNumber.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })
          : "—";
        return <span>{formatted}</span>;
      },
    },
    {
      key: "actions",
      label: "Ações",
      render: (_, row: Product) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleEdit(row)}
            className="shadow-md rounded-md p-1 bg-white hover:bg-gray-50"
          >
            <Eye size={20} className="text-blue-600 hover:text-blue-800" />
          </button>
          <button
            onClick={() => handleDeleteClick(row)}
            className="shadow-md rounded-md p-1 bg-white hover:bg-gray-50"
          >
            <Trash size={20} className="text-red-600 hover:text-red-800" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Produtos"
        actions={
          <div className="flex items-center gap-4">
            {Object.keys(tableState.filters).length > 0 && (
              <button
                onClick={resetFilters}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Limpar filtros ({Object.keys(tableState.filters).length})
              </button>
            )}
            <button
              onClick={handleNew}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <Plus size={20} className="mr-2" />
              Novo Produto
            </button>
          </div>
        }
      />

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={products}
        loading={loading}
        error={error}
        pagination={
          paginationData && {
            currentPage: Number(paginationData.page),
            totalPages: paginationData.last_page,
            totalItems: paginationData.total,
            itemsPerPage: Number(paginationData.limit),
            limitOptions,
            onPageChange: updatePage,
            onLimitChange: updateLimit,
          }
        }
        sorting={{
          sortBy: tableState.sort.sortBy,
          order: tableState.sort.order,
          onSortChange: updateSort,
        }}
        filtering={{
          filters: tableState.filters,
          onFilterChange: updateFilter,
        }}
      />

      {/* Modal de criação/edição */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-card rounded-2xl p-6 w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="flex justify-between items-center mb-6 sticky top-0 bg-card z-10">
              <h2 className="text-xl font-semibold text-foreground">
                {editingProduct ? "Editar Produto" : "Novo Produto"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                X
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Categoria */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Categoria *</label>
                <select
                  name="category_id"
                  value={formData.category_id ?? ""}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-border bg-input text-foreground px-3 py-2
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all"
                  required
                >
                  <option value="">Selecione uma categoria</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Modelo */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Modelo *</label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-border bg-input text-foreground px-3 py-2
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all"
                  required
                />
              </div>

              {/* Descrição */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Descrição *</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-border bg-input text-foreground px-3 py-2
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all"
                  required
                />
              </div>

              {/* Valores */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Valores *</label>
                <textarea
                  name="values"
                  value={formData.values}
                  onChange={handleChange}
                  rows={3}
                  className="w-full rounded-lg border border-border bg-input text-foreground px-3 py-2
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all"
                  required
                />
              </div>

              {/* Aplicações */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Aplicações *</label>
                <textarea
                  name="applications"
                  value={formData.applications}
                  onChange={handleChange}
                  rows={3}
                  className="w-full rounded-lg border border-border bg-input text-foreground px-3 py-2
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all"
                  required
                />
              </div>

              {/* Preço */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Preço *</label>
                <input
                  type="text"
                  name="price"
                  value={
                    formData.price
                      ? formData.price.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })
                      : ""
                  }
                  onChange={handleChange}
                  className="w-full rounded-lg border border-border bg-input text-foreground px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all"
                />
              </div>

              {/* Imagem */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Imagem do Produto</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  accept="image/*"
                  className="w-full rounded-lg border border-border bg-input text-foreground px-3 py-2
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all"
                />
              </div>

              {/* Checkbox ativo */}
              <div className="flex items-center gap-2">
                <input
                  id="is_active"
                  type="checkbox"
                  name="is_active"
                  checked={formData.is_active}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                />
                <label htmlFor="is_active" className="text-sm font-medium text-foreground">
                  Ativo
                </label>
              </div>

              {/* Botões */}
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg border border-border bg-muted text-muted-foreground
              hover:bg-muted/70 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={editingProduct ? !hasChanges : !allFieldsFilled}
                  className={`px-4 py-2 rounded-lg text-white font-medium transition-colors
              ${editingProduct
                      ? hasChanges
                        ? "bg-primary hover:bg-primary/90"
                        : "bg-muted cursor-not-allowed text-muted-foreground"
                      : allFieldsFilled
                        ? "bg-primary hover:bg-primary/90"
                        : "bg-muted cursor-not-allowed text-muted-foreground"
                    }`}
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de exclusão */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60]">
          <div className="bg-card rounded-2xl p-6 w-full max-w-sm mx-4 animate-scale-in">
            <h2 className="text-lg font-semibold mb-4 text-foreground">Confirmar exclusão</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Tem certeza que deseja excluir o produto{" "}
              <strong className="text-foreground">{productToDelete?.model}</strong>?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-lg border border-border bg-muted text-muted-foreground
            hover:bg-muted/70 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg bg-destructive text-white hover:bg-destructive/90 transition-colors"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
