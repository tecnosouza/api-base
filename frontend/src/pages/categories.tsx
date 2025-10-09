import React, { useCallback, useEffect, useState } from "react";
import { Column, DataTable } from "@/components/ui/data-table";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { useAdvancedTable } from "@/hooks/useAdvancedTable";
import { useApiQuery } from "@/hooks/useApiQuery";
import { categoriesService } from "@/services/categoriesService";
import { Eye, Plus, Trash } from "lucide-react";
import FormatDate from "../components/ui/format-date";
import { useToast } from "@/hooks/use-toast";

// Interface representando o tipo de dado de uma categoria
interface Category {
  id?: number;
  title_menu: string;
  title: string;
  description: string;
  is_active: boolean;
  created_at?: string;
}

const Categories = () => {
  // Controle dos modais
  const [showModal, setShowModal] = useState(false); // Criação/Edição
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Confirmação de exclusão

  // Armazena a categoria que será excluída
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

  // Estado da categoria sendo editada
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Dados do formulário
  const [formData, setFormData] = useState<Category>({
    title_menu: "",
    title: "",
    description: "",
    is_active: true,
  });

  // Armazena o estado inicial dos dados antes da edição
  const [initialData, setInitialData] = useState<Category | null>(null);

  // Hook para exibir notificações (toasts)
  const { toast } = useToast();

  // Hook customizado para lidar com paginação, filtros e ordenação
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

  // Memoriza os parâmetros de busca para evitar recriação desnecessária
  const memoizedGetApiParams = useCallback(getApiParams, [tableState, getApiParams]);

  // Hook customizado para requisição de dados da API
  const {
    data: categories,
    pagination: paginationData,
    loading,
    error,
    refetch,
    updateParams,
  } = useApiQuery({
    queryFn: categoriesService.getAll,
    initialParams: memoizedGetApiParams,
  });

  // Atualiza os parâmetros sempre que o estado da tabela mudar
  useEffect(() => {
    updateParams(memoizedGetApiParams);
  }, [memoizedGetApiParams, updateParams]);

  // === HANDLERS DE AÇÕES ===

  // Abre o modal de nova categoria
  const handleNew = () => {
    setEditingCategory(null);
    setFormData({
      title_menu: "",
      title: "",
      description: "",
      is_active: true,
    });
    setInitialData(null);
    setShowModal(true);
  };

  // Abre o modal de edição, preenchendo os dados da categoria selecionada
  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      title_menu: category.title_menu,
      title: category.title,
      description: category.description,
      is_active: category.is_active,
    });
    setInitialData({
      title_menu: category.title_menu,
      title: category.title,
      description: category.description,
      is_active: category.is_active,
    });
    setShowModal(true);
  };

  // Abre o modal de confirmação de exclusão
  const handleDeleteClick = (category: Category) => {
    setCategoryToDelete(category);
    setShowDeleteModal(true);
  };

  // Confirma exclusão da categoria
  const confirmDelete = async () => {
    if (!categoryToDelete) return;
    try {
      await categoriesService.delete(categoryToDelete.id!);
      toast({ title: "Sucesso", description: "Categoria excluída com sucesso!" });
      setShowDeleteModal(false);
      setCategoryToDelete(null);
      refetch(); // Recarrega a lista após excluir
    } catch (error: any) {
      const messages = error?.response?.data?.errors?.map((e: any) => e.msg)?.join("\n");
      toast({
        title: "Erro",
        description: messages ?? "Erro ao excluir categoria.",
        color: "error",
      });
      console.error(error);
    }
  };

  // Verifica se houve mudanças nos campos (para habilitar/desabilitar botão Salvar)
  const hasChanges =
    editingCategory &&
    initialData &&
    JSON.stringify(formData) !== JSON.stringify(initialData);

  // Verifica se todos os campos obrigatórios foram preenchidos
  const allFieldsFilled =
    formData.title_menu.trim() && formData.title.trim() && formData.description.trim();

  // Envia o formulário (criação ou edição)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        // Apenas envia os campos alterados
        const updatedFields: Partial<Category> = {};
        Object.keys(formData).forEach((key) => {
          if (formData[key as keyof Category] !== initialData?.[key as keyof Category]) {
            updatedFields[key as keyof Category] = formData[key as keyof Category];
          }
        });

        await categoriesService.update(editingCategory.id!, updatedFields);
        toast({ title: "Sucesso", description: "Categoria atualizada com sucesso!" });
      } else {
        // Criação de nova categoria
        await categoriesService.create(formData);
        toast({ title: "Sucesso", description: "Categoria criada com sucesso!" });
      }

      setShowModal(false);
      refetch();
    } catch (error: any) {
      const messages = error?.response?.data?.errors?.map((e: any) => e.msg)?.join("\n");
      toast({
        title: "Erro",
        description: messages ?? "Erro ao salvar categoria.",
        color: "error",
      });
      console.error(error);
    }
  };

  // Atualiza o estado dos inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Formata data para exibição
  const formatDate = (dateString: string) => FormatDate(dateString, "dd/mm/yyyy às hh:mm:ss");

  // === DEFINIÇÃO DAS COLUNAS DA TABELA ===
  const columns: Column[] = [
    {
      key: "title_menu",
      label: "Categoria no menu",
      filterable: true,
      sortable: true,
    },
    {
      key: "title",
      label: "Texto da página",
      filterable: true,
      sortable: true,
    },
    {
      key: "description",
      label: "Descrição",
      filterable: true,
      sortable: true,
    },
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
      render: (_, row: Category) => (
        <StatusBadge
          status={row.is_active ? "Ativo" : "Inativo"}
          variant={row.is_active ? "success" : "warning"}
        />
      ),
    },
    {
      key: "actions",
      label: "Ações",
      // Botões de ação na tabela (editar e excluir)
      render: (_, row: Category) => (
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

  // === RENDERIZAÇÃO PRINCIPAL ===
  return (
    <div className="space-y-6">
      {/* Cabeçalho da página com título e botão de nova categoria */}
      <PageHeader
        title="Categorias"
        actions={
          <div className="flex items-center gap-4">
            {/* Botão de limpar filtros (aparece somente quando houver filtros ativos) */}
            {Object.keys(tableState.filters).length > 0 && (
              <button
                onClick={resetFilters}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Limpar filtros ({Object.keys(tableState.filters).length})
              </button>
            )}

            {/* Botão para criar nova categoria */}
            <button
              onClick={handleNew}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <Plus size={20} className="mr-2" />
              Nova Categoria
            </button>
          </div>
        }
      />

      {/* Tabela de categorias */}
      <DataTable
        columns={columns}
        data={categories}
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
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl mx-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {editingCategory ? "Editar Categoria" : "Nova Categoria"}
            </h2>

            {/* Formulário de criação/edição */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Campo: Categoria no menu */}
              <div>
                <label className="block text-sm font-medium mb-1">Categoria no menu</label>
                <input
                  type="text"
                  name="title_menu"
                  value={formData.title_menu}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>

              {/* Campo: Texto da página */}
              <div>
                <label className="block text-sm font-medium mb-1">Texto da página</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>

              {/* Campo: Descrição */}
              <div>
                <label className="block text-sm font-medium mb-1">Descrição</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  rows={3}
                  required
                />
              </div>

              {/* Checkbox: Ativo */}
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

              {/* Botões de ação do modal */}
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
                  disabled={editingCategory ? !hasChanges : !allFieldsFilled}
                  className={`px-4 py-2 rounded-md text-white ${
                    editingCategory
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

      {/* Modal de confirmação de exclusão */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm mx-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Confirmar exclusão
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Tem certeza que deseja excluir a categoria{" "}
              <strong>{categoryToDelete?.title_menu}</strong>?
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

export default Categories;
