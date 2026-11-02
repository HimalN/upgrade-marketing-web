"use client";

import { useState } from "react";
import { toast } from "sonner";
import { UserCheck, Shield, Plus, Key, CheckCircle, Trash2 } from "lucide-react";

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: "super_admin" | "admin" | "editor";
  created_at: string;
}

const DEFAULT_USERS: AdminUser[] = [
  {
    id: "usr-1",
    email: "admin@upgrademarketing.agency",
    name: "Alexander Vance (Master)",
    role: "super_admin",
    created_at: "2026-01-01",
  },
  {
    id: "usr-2",
    email: "editor@upgrademarketing.agency",
    name: "Elena Rostova (Strategy)",
    role: "admin",
    created_at: "2026-01-15",
  },
];

export default function UserManagementPage() {
  const [users, setUsers] = useState<AdminUser[]>(DEFAULT_USERS);
  const [showAdd, setShowAdd] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState<"admin" | "editor">("admin");

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail || !newName) return;
    setUsers((prev) => [
      ...prev,
      {
        id: `usr-${Date.now()}`,
        email: newEmail,
        name: newName,
        role: newRole,
        created_at: new Date().toISOString().split("T")[0],
      },
    ]);
    toast.success(`Admin user "${newName}" added`);
    setNewEmail("");
    setNewName("");
    setShowAdd(false);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Administrator Accounts</h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Manage authenticated users with dashboard access privileges.
          </p>
        </div>

        <button
          onClick={() => setShowAdd(!showAdd)}
          className="px-5 py-2.5 rounded-xl bg-[#D6A64B] text-[#080808] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg hover:bg-[#E8C477]"
        >
          <Plus className="w-4 h-4" />
          <span>Add Admin User</span>
        </button>
      </div>

      {showAdd && (
        <form
          onSubmit={handleAddUser}
          className="p-6 rounded-2xl bg-[#111111] border border-[#D6A64B] space-y-4 text-xs"
        >
          <h3 className="font-bold text-white text-sm">Provision New Administrator</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="font-semibold text-zinc-300 block mb-1">Full Name</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
                className="w-full bg-[#080808] border border-zinc-800 rounded-lg px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="font-semibold text-zinc-300 block mb-1">Corporate Email</label>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                required
                className="w-full bg-[#080808] border border-zinc-800 rounded-lg px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="font-semibold text-zinc-300 block mb-1">Assigned Role</label>
              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value as "admin" | "editor")}
                className="w-full bg-[#080808] border border-zinc-800 rounded-lg px-3 py-2 text-white"
              >
                <option value="admin">Administrator</option>
                <option value="editor">Editor</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAdd(false)}
              className="px-4 py-2 rounded-lg bg-zinc-900 text-zinc-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-[#D6A64B] text-[#080808] font-bold"
            >
              Provision Account
            </button>
          </div>
        </form>
      )}

      <div className="p-6 rounded-3xl bg-[#111111] border border-zinc-800 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#171717] text-zinc-400 uppercase tracking-wider border-b border-zinc-800">
              <tr>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Access Role</th>
                <th className="py-3 px-4">Provisioned</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 text-zinc-300">
              {users.map((u) => (
                <tr key={u.id}>
                  <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#D6A64B]/20 text-[#D6A64B] flex items-center justify-center font-bold">
                      {u.name.charAt(0)}
                    </div>
                    <span>{u.name}</span>
                  </td>
                  <td className="py-3 px-4 text-zinc-400">{u.email}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        u.role === "super_admin"
                          ? "bg-[#D6A64B]/20 text-[#D6A64B] border border-[#D6A64B]/30"
                          : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                      }`}
                    >
                      {u.role.replace("_", " ")}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-zinc-500">{u.created_at}</td>
                  <td className="py-3 px-4 text-right">
                    {u.role !== "super_admin" && (
                      <button
                        onClick={() => {
                          setUsers((prev) => prev.filter((item) => item.id !== u.id));
                          toast.success("User removed");
                        }}
                        className="p-1 rounded bg-red-950/40 text-red-400 hover:bg-red-800 hover:text-white"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

