import AdminAside from "@/Pages/Admin/aside/AdminAside";
import AdminHeader from "@/Pages/Admin/header/AdminHeader";
import { Link } from "@inertiajs/react";
import { Grid } from "@mui/material";

export default function AdminLayout({ children }) {
  const style = {
    display: 'flex',
    alignItems: 'stretch',
  }
  return (
    <>
      <AdminHeader />

      <div style={style}>
        <AdminAside />

        <div style={{padding: '20px', width: '100%'}}>
          {children}
        </div>
      </div>
    </>
  );
}
