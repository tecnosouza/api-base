import React, { useCallback, useEffect, useState } from "react";
import { Column, DataTable } from "@/components/ui/data-table";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { useAdvancedTable } from "@/hooks/useAdvancedTable";
import { useApiQuery } from "@/hooks/useApiQuery";
import { Eye, Plus, Trash } from "lucide-react";
import FormatDate from "@/components/ui/format-date";
import { useToast } from "@/hooks/use-toast";
import { personsService } from "@/services/personsService";

interface User {
  id?: number;
  admin: boolean;
  name: string;
  last_name: string;
  date_of_birth: string;
  rg: string;
  cpf: string;
  username: string;
  password: string;
  created_at?: string;
}

const Users = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const [formData, setFormData] = useState<User>({
    admin: true,
    name: "",
    last_name: "",
    date_of_birth: "",
    rg: "",
    cpf: "",
    username: "",
    password: "",
  });

  const [initialData, setInitialData] = useState<User | null>(null);
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
    data: users,
    pagination: paginationData,
    loading,
    error,
    refetch,
    updateParams,
  } = useApiQuery({
    queryFn: personsService.getAll,
    initialParams: memoizedGetApiParams,
  });

  useEffect(() => {
    updateParams(memoizedGetApiParams);
  }, [memoizedGetApiParams, updateParams]);

  const handleNew = () => {
    setEditingUser(null);
    setFormData({
      admin: true,
      name: "",
      last_name: "",
      date_of_birth: "",
      rg: "",
      cpf: "",
      username: "",
      password: "",
    });
    setInitialData(null);
    setShowModal(true);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      admin: user.admin,
      name: user.name,
      last_name: user.last_name,
      date_of_birth: user.date_of_birth,
      rg: user.rg,
      cpf: user.cpf,
      username: user.username,
      password: "", // senha nunca vem preenchida
    });
    setInitialData(user);
    setShowModal(true);
  };

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;
    try {
      await personsService.delete(userToDelete.id!);
      toast({ title: "Sucesso", description: "Usuário excluído com sucesso!" });
      setShowDeleteModal(false);
      setUserToDelete(null);
      refetch();
    } catch (error: any) {
      const messages = error?.response?.data?.errors?.map((e: any) => e.msg)?.join("\n");
      toast({
        title: "Erro",
        description: messages ?? "Erro ao excluir usuário.",
        color: "error",
      });
      console.error(error);
    }
  };

  const hasChanges = editingUser && initialData && JSON.stringify(formData) !== JSON.stringify(initialData);

  const allFieldsFilled =
    formData.name.trim() &&
    formData.last_name.trim() &&
    formData.cpf.trim() &&
    formData.username.trim() &&
    (!editingUser ? formData.password.trim() : true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingUser) {
        const updatedFields: Partial<User> = {};
        Object.keys(formData).forEach((key) => {
          if (formData[key as keyof User] !== initialData?.[key as keyof User]) {
            updatedFields[key as keyof User] = formData[key as keyof User];
          }
        });

        await personsService.update(editingUser.id!, updatedFields);
        toast({ title: "Sucesso", description: "Usuário atualizado com sucesso!" });
      } else {
        await personsService.create(formData);
        toast({ title: "Sucesso", description: "Usuário criado com sucesso!" });
      }

      setShowModal(false);
      refetch();
    } catch (error: any) {
      const messages = error?.response?.data?.errors?.map((e: any) => e.msg)?.join("\n");
      toast({
        title: "Erro",
        description: messages ?? "Erro ao salvar usuário.",
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

  const formatDate = (dateString: string) => FormatDate(dateString, "dd/mm/yyyy");

  const columns: Column[] = [
    { key: "id", label: "ID", sortable: true },
    { key: "name", label: "Nome", filterable: true, sortable: true },
    { key: "last_name", label: "Sobrenome", filterable: true, sortable: true },
    { key: "cpf", label: "CPF", filterable: true, sortable: true },
    { key: "username", label: "Usuário", filterable: true, sortable: true },
    {
      key: "admin",
      label: "Tipo",
      render: (_, row: User) => (
        <StatusBadge
          status={row.admin ? "Administrador" : "Usuário comum"}
          variant={row.admin ? "success" : "default"}
        />
      ),
    },
    {
      key: "created_at",
      label: "Criado em",
      sortable: true,
      render: (value: string) => (
        <span className="text-sm text-gray-500">{formatDate(value)}</span>
      ),
    },
    {
      key: "actions",
      label: "Ações",
      render: (_, row: User) => (
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
        title="Usuários"
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
              Novo Usuário
            </button>
          </div>
        }
      />

      <DataTable
        columns={columns}
        data={users}
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
              {editingUser ? "Editar Usuário" : "Novo Usuário"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Nome*</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Sobrenome*</label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">CPF*</label>
                  <input
                    type="text"
                    name="cpf"
                    value={formData.cpf}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">RG</label>
                  <input
                    type="text"
                    name="rg"
                    value={formData.rg}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Data de Nascimento</label>
                <input
                  type="date"
                  name="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Usuário*</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>

              {!editingUser && (
                <div>
                  <label className="block text-sm font-medium mb-1">Senha*</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                    minLength={6}
                    required
                  />
                </div>
              )}

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
                  disabled={editingUser ? !hasChanges : !allFieldsFilled}
                  className={`px-4 py-2 rounded-md text-white ${
                    editingUser
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
              Tem certeza que deseja excluir o usuário{" "}
              <strong>{userToDelete?.name} {userToDelete?.last_name}</strong>?
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

export default Users;
