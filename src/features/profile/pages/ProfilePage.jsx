import { useUser } from "@/features/auth/hooks/useUser";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import PersonalInformationCard from "../components/PersonalInformationCard";
import ChangePasswordCard from "../components/ChangePasswordCard";

function ProfilePage() {
  const { data: userData, isLoading } = useUser();

  if (isLoading || !userData) return <LoadingSpinner />;

  return (
    <div className="flex flex-col gap-lg">
      <div className="flex flex-col gap-0.5">
        <h1 className="font-display text-2xl font-bold tracking-tight text-text">
          My Profile
        </h1>
        <p className="text text-text-muted">
          Manage your personal information and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <PersonalInformationCard
          userId={userData?.profile?.id}
          profile={userData?.profile}
          email={userData?.user?.email}
          role={userData?.profile?.role}
        />
        <ChangePasswordCard email={userData?.user?.email} />
      </div>
    </div>
  );
}

export default ProfilePage;
