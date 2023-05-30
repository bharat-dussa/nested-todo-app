import React, { useEffect } from "react";
import TodoApp from "../../components/nested-todo/nested-todo.component";
import {
  LOCAL_KEYS,
  getLocalStorageItem,
} from "../../utils/local-storage.util";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  
  return (
    <div>
      DashboardPage
      <TodoApp />
    </div>
  );
};

export default DashboardPage;
