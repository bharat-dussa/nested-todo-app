import TodoApp from "../../components/nested-todo/nested-todo.component";
import ProfileCard from "../../components/profile-card/profile-card.component";
import { useAuth } from "../../store/app-store";

const DashboardPage = () => {
  const { userDetails } = useAuth();
  return (
    <>
      <ProfileCard UserDetails={userDetails} />
      <TodoApp />
    </>
  );
};

export default DashboardPage;
