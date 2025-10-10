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
      date_of_birth: user.date_of_birth ? user.date_of_birth.split("T")[0] : "",
      rg: user.rg,
      cpf: user.cpf,
      username: user.username,
      password: "", // senha nunca vem preenchida
    });
    setInitialData(user);
    setShowModal(true);
  };

  const handleDeleteClick = (user: User) => {
    const userData = localStorage.getItem("user_data");

    if (userData) {
      const parsed = JSON.parse(userData);
      const loggedUser = parsed?.data; // ✅ pega o objeto real do usuário

      // 🚫 Impede o usuário de se autoexcluir
      if (loggedUser?.id === user.id) {
        toast({
          title: "Ação não permitida",
          description: "Você não pode excluir o seu próprio usuário.",
          color: "warning",
        });
        return;
      }
    }

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
          const value = formData[key as keyof User];
          const initialValue = initialData?.[key as keyof User];

          // 🔹 Ignora senha vazia
          if (key === "password" && !value) return;

          if (value !== initialValue) {
            updatedFields[key as keyof User] = value;
          }
        });

        await personsService.update(editingUser.id!, updatedFields);
        toast({ title: "Sucesso", description: "Usuário atualizado com sucesso!" });
      } else {
        // 🔹 Criação — senha é obrigatória
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
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="modern-card w-full max-w-3xl mx-4 animate-scale-in text-foreground">
            <h2 className="text-xl font-semibold text-foreground mb-6">
              {editingUser ? "Editar Usuário" : "Novo Usuário"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Linha 1 */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-foreground"
                  >
                    Nome *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-border bg-input text-foreground px-3 py-2
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                         transition-all placeholder:text-muted-foreground"
                    placeholder="Digite o nome"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="last_name"
                    className="text-sm font-medium text-foreground"
                  >
                    Sobrenome *
                  </label>
                  <input
                    id="last_name"
                    name="last_name"
                    type="text"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-border bg-input text-foreground px-3 py-2
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                         transition-all placeholder:text-muted-foreground"
                    placeholder="Digite o sobrenome"
                    required
                  />
                </div>
              </div>

              {/* Linha 2 */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label
                    htmlFor="cpf"
                    className="text-sm font-medium text-foreground"
                  >
                    CPF *
                  </label>
                  <input
                    id="cpf"
                    name="cpf"
                    type="text"
                    value={formData.cpf}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-border bg-input text-foreground px-3 py-2
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                         transition-all placeholder:text-muted-foreground"
                    placeholder="Digite o CPF"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="rg"
                    className="text-sm font-medium text-foreground"
                  >
                    RG
                  </label>
                  <input
                    id="rg"
                    name="rg"
                    type="text"
                    value={formData.rg}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-border bg-input text-foreground px-3 py-2
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                         transition-all placeholder:text-muted-foreground"
                    placeholder="Digite o RG"
                  />
                </div>
              </div>

              {/* Data de nascimento */}
              <div className="space-y-2">
                <label
                  htmlFor="date_of_birth"
                  className="text-sm font-medium text-foreground"
                >
                  Data de Nascimento
                </label>
                <input
                  id="date_of_birth"
                  name="date_of_birth"
                  type="date"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-border bg-input text-foreground px-3 py-2
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                       transition-all"
                />
              </div>

              {/* Usuário */}
              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className="text-sm font-medium text-foreground"
                >
                  Usuário *
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-border bg-input text-foreground px-3 py-2
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                       transition-all placeholder:text-muted-foreground"
                  placeholder="Digite o usuário"
                  required
                />
              </div>

              {/* Senha (somente para novo usuário) */}
              {!editingUser && (
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-foreground"
                  >
                    Senha *
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-border bg-input text-foreground px-3 py-2
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                         transition-all placeholder:text-muted-foreground"
                    placeholder="Digite a senha"
                    minLength={6}
                    required
                  />
                </div>
              )}

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
                  disabled={editingUser ? !hasChanges : !allFieldsFilled}
                  className={`px-4 py-2 rounded-lg text-white font-medium transition-colors
              ${editingUser
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
          <div className="modern-card w-full max-w-sm mx-4 text-foreground animate-scale-in">
            <h2 className="text-lg font-semibold mb-4 text-foreground">
              Confirmar exclusão
            </h2>

            <p className="text-sm text-muted-foreground mb-6">
              Tem certeza que deseja excluir o usuário{" "}
              <strong className="text-foreground">
                {userToDelete?.name} {userToDelete?.last_name}
              </strong>
              ?
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
                className="px-4 py-2 rounded-lg font-medium text-white bg-destructive 
                     hover:bg-destructive/90 transition-colors"
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
