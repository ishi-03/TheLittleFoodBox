

const AdminMenu = () => {
  return (
    <div>
      <h1>Admin Menu</h1>
      <ul>
        <li><a href="/admin/users">Manage Users</a></li>
        <li><a href="/admin/products">Manage Products</a></li>
        <li><a href="/admin/orders">Manage Orders</a></li>
      </ul>
    </div>
  );
};

export default AdminMenu;

