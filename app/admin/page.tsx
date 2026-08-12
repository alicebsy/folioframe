import { requireAdmin } from "@/lib/auth";
import { getAdminMembers } from "@/lib/admin";
import AdminMembersClient from "@/components/admin/AdminMembersClient";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  await requireAdmin();
  const members = await getAdminMembers();
  return <AdminMembersClient initialMembers={members} />;
}
