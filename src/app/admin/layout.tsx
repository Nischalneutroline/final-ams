import HomeIcon from "@mui/icons-material/Home";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import GroupIcon from "@mui/icons-material/Group";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import Header from "@/features/shared-features/header/header";
import { SideBarProps } from "@/features/shared-features/sidebar/mobilesidebar";
import ResponsiveSidebar from "@/features/shared-features/sidebar/responsivesidebar";
import AddUserForm from "@/features/form-components/form-method/add/AddUserForm";
import AddAppointmentForm from "@/features/form-components/form-method/add/AddAppointmentForm";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sidebarData: SideBarProps = {
    title: "Customer Name ",
    menus: [
      {
        menu: "Dashboard",
        icon: <HomeRoundedIcon sx={{ fontSize: 28 }} />,
        path: "/admin",
      },
      {
        menu: "Appointments",
        icon: <CalendarMonthOutlinedIcon sx={{ fontSize: 25 }} />,
        path: "/admin/appointments",
      },
      {
        menu: "Customer",
        icon: <GroupIcon sx={{ fontSize: 25 }} />,
        path: "/admin/customer",
      },
      {
        menu: "Availability and Scheduling",
        icon: <PendingActionsIcon sx={{ fontSize: 25 }} />,
        path: "/admin/scheduling",
      },
      {
        menu: "Serivces",
        icon: <DesignServicesIcon sx={{ fontSize: 25 }} />,
        path: "/admin/services",
      },
      {
        menu: "Buisness Setting",
        icon: <SettingsIcon sx={{ fontSize: 25 }} className="" />,
        path: "/admin/businesssetting",
      },
      {
        menu: "Notification and Reminder",
        icon: <NotificationsIcon sx={{ fontSize: 25 }} />,
        path: "/admin/notification",
      },
      {
        menu: "Support and Help",
        icon: <HeadsetMicIcon sx={{ fontSize: 25 }} />,
        path: "/admin/support",
      },
    ],
  };
  return (
    <div className="h-screen w-screen relative flex">
      <ResponsiveSidebar title={sidebarData.title} menus={sidebarData.menus} />
      <div className="flex-1 ">
        <Header
          icon={<HomeIcon className="text-white" />}
          pageTitle="Dashboard"
        />
        <AddAppointmentForm />
        <AddUserForm />
        <div
          className="absolute  min-h-[calc(100vh-376px)] lg:ml-[325px]
        min-w-screen lg:min-w-[calc(100vw-325px)] p-2 px-4 overflow-hidden"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
