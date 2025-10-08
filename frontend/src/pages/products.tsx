import React, { useCallback, useEffect, useState } from "react";
import { Column, DataTable } from "@/components/ui/data-table";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { useAdvancedTable } from "@/hooks/useAdvancedTable";
import { useApiQuery } from "@/hooks/useApiQuery";
import { productsService } from "@/services/productsService";
import { categoriesService } from "@/services/categoriesService";
import { Eye, Plus, Trash } from "lucide-react";
import FormatDate from "../components/ui/format-date";
import { useToast } from "@/hooks/use-toast";

interface Category {
  id: number;
  title: string;
}

interface Product {
  id?: number;
  model: string;
  description: string;
  values: string;
  applications: string;
  is_active: boolean;
  created_at?: string;
  category_id?: number;
  category?: {
    id: number,
    title: string,
    title_menu: string,
    description: string,
    is_active: boolean,
  };
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
    applications: "",
    is_active: true,
    category_id: undefined,
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
  } = useAdvancedTable({
    initialLimit: 10,
    limitOptions: [10, 25, 50],
  });

  const memoizedGetApiParams = useCallback(getApiParams, [tableState, getApiParams]);

  const {
    data: products,
    pagination: paginationData,
    loading,
    error,
    refetch,
    updateParams,
  } = useApiQuery({
    queryFn: productsService.getAll,
    initialParams: memoizedGetApiParams,
  });

  // Carregar categorias ao montar o componente
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoriesService.getAll();
        setCategories(response?.data ?? []);
      } catch (err) {
        console.error("Erro ao carregar categorias:", err);
        toast({
          title: "Erro",
          description: "Falha ao carregar categorias.",
          color: "error",
        });
      }
    };
    fetchCategories();
  }, [toast]);

  useEffect(() => {
    updateParams(memoizedGetApiParams);
  }, [memoizedGetApiParams, updateParams]);

  const handleNew = () => {
    setEditingProduct(null);
    setFormData({
      model: "",
      description: "",
      values: "",
      applications: "",
      is_active: true,
      category_id: undefined,
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
      applications: product.applications,
      is_active: product.is_active,
      category_id: product.category_id,
    });
    setInitialData({
      model: product.model,
      description: product.description,
      values: product.values,
      applications: product.applications,
      is_active: product.is_active,
      category_id: product.category_id,
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
      await productsService.delete(productToDelete.id!);
      toast({ title: "Sucesso", description: "Produto excluído com sucesso!" });
      setShowDeleteModal(false);
      setProductToDelete(null);
      refetch();
    } catch (error: any) {
      const messages = error?.response?.data?.errors?.map((e: any) => e.msg)?.join("\n");
      toast({
        title: "Erro",
        description: messages ?? "Erro ao excluir produto.",
        color: "error",
      });
      console.error(error);
    }
  };

  const hasChanges =
    editingProduct && initialData && JSON.stringify(formData) !== JSON.stringify(initialData);

  const allFieldsFilled =
    formData.model.trim() &&
    formData.description.trim() &&
    formData.values.trim() &&
    formData.applications.trim() &&
    formData.category_id;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        const updatedFields: Partial<Product> = {};
        Object.keys(formData).forEach((key) => {
          if (formData[key as keyof Product] !== initialData?.[key as keyof Product]) {
            updatedFields[key as keyof Product] = formData[key as keyof Product];
          }
        });

        await productsService.update(editingProduct.id!, updatedFields);
        toast({ title: "Sucesso", description: "Produto atualizado com sucesso!" });
      } else {
        await productsService.create(formData);
        toast({ title: "Sucesso", description: "Produto criado com sucesso!" });
      }

      setShowModal(false);
      refetch();
    } catch (error: any) {
      const messages = error?.response?.data?.errors?.map((e: any) => e.msg)?.join("\n");
      toast({
        title: "Erro",
        description: messages ?? "Erro ao salvar produto.",
        color: "error",
      });
      console.error(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const formatDate = (dateString: string) => FormatDate(dateString, "dd/mm/yyyy às hh:mm:ss");

  const columns: Column[] = [
    {
      key: "created_at",
      label: "Data",
      sortable: true,
      render: (_, row: Product) => (
        <span>{row.category.title_menu}</span>
        // <StatusBadge
        //   status={row.is_active ? "Ativo" : "Inativo"}
        //   variant={row.is_active ? "success" : "warning"}
        // />
      ),
    },    { key: "model", label: "Modelo", filterable: true, sortable: true },
    { key: "description", label: "Descrição", filterable: true, sortable: true },
    { key: "values", label: "Valores", filterable: true, sortable: true },
    { key: "applications", label: "Aplicações", filterable: true, sortable: true },
    {
      key: "created_at",
      label: "Data",
      sortable: true,
      render: (value: string) => (
        <span className="text-sm text-gray-500">{formatDate(value)}</span>
      ),
    },
    {
      key: "is_active",
      label: "Status",
      render: (_, row: Product) => (
        <StatusBadge
          status={row.is_active ? "Ativo" : "Inativo"}
          variant={row.is_active ? "success" : "warning"}
        />
      ),
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

      <DataTable
        columns={columns}
        data={products}
        loading={loading}
        error={error}
        pagination={
          paginationData && {
            currentPage: paginationData.page,
            totalPages: paginationData.totalPages,
            totalItems: paginationData.total,
            itemsPerPage: paginationData.limit,
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {editingProduct ? "Editar Produto" : "Novo Produto"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Modelo</label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Descrição</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  rows={2}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Valores</label>
                <input
                  type="text"
                  name="values"
                  value={formData.values}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Aplicações</label>
                <input
                  type="text"
                  name="applications"
                  value={formData.applications}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>

              {/* Campo: Categoria */}
              <div>
                <label className="block text-sm font-medium mb-1">Categoria</label>
                <select
                  name="category_id"
                  value={formData.category_id ?? ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
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

              <div className="flex items-center gap-2">
                <input
                  id="is_active"
                  type="checkbox"
                  name="is_active"
                  checked={formData.is_active}
                  onChange={handleChange}
                />
                <label htmlFor="is_active" className="text-sm font-medium">
                  Ativo
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-700 border rounded-md hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={editingProduct ? !hasChanges : !allFieldsFilled}
                  className={`px-4 py-2 rounded-md text-white ${
                    editingProduct
                      ? hasChanges
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-blue-300 cursor-not-allowed"
                      : allFieldsFilled
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-blue-300 cursor-not-allowed"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm mx-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Confirmar exclusão
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Tem certeza que deseja excluir o produto{" "}
              <strong>{productToDelete?.model}</strong>?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-700 border rounded-md hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
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
