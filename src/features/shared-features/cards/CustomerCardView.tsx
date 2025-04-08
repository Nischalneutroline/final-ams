import React from "react";
import {
  Card,
  Typography,
  Avatar,
  Box,
  Stack,
  Divider,
  Icon,
  Grid,
} from "@mui/material";

import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import CakeIcon from "@mui/icons-material/Cake";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import BadgeIcon from "@mui/icons-material/Badge";
import { DataTableRowActions } from "../table/data-table-row-actions";

interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  totalAppointments: number;
  lastAppointment: string;
  createdBy: string;
}
interface CustomerCardViewProps {
  user: User[]; // Ensure the prop type is an array of users
}

const CustomerCardView = ({ user }: CustomerCardViewProps) => {
  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const formatDateTime = (dateStr: string) =>
    new Date(dateStr).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <Grid
      container
      spacing={4}
      className="justify-around max-h-[500px] overflow-y-auto scrollbar py-4"
    >
      {user?.map((user: any, index: number) => {
        return (
          <Grid component="div" key={index}>
            <Card
              sx={{
                minWidth: "100%",
                mx: "auto",
                borderRadius: 4,
                boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#fff",
                p: 3,
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0px 10px 40px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <div className="flex w-full justify-between">
                  <div className="flex gap-4">
                    <Avatar
                      sx={{
                        width: 56,
                        height: 56,
                        bgcolor: "#F5F5F5",
                        color: "#287AFF", // Blue accent color
                        fontSize: 22,
                        fontWeight: 600,
                      }}
                    >
                      {user.fullName
                        .split(" ")
                        .map((n: any) => n[0])
                        .join("")}
                    </Avatar>

                    <Box>
                      <Typography fontWeight={600} color="#333">
                        {user.fullName}
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        <BadgeIcon sx={{ color: "gray", fontSize: "20px" }} />
                        <Typography variant="body2" color="text.secondary">
                          Created by {user.createdBy}
                        </Typography>
                      </Stack>
                    </Box>
                  </div>
                  <DataTableRowActions row={user} />
                </div>
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Stack spacing={1.5}>
                <InfoRow
                  icon={
                    <AlternateEmailIcon
                      sx={{ color: "gray", fontSize: "20px" }}
                    />
                  }
                  label="Email"
                  value={user.email}
                />
                <InfoRow
                  icon={
                    <LocalPhoneIcon sx={{ color: "gray", fontSize: "20px" }} />
                  }
                  label="Phone"
                  value={user.phoneNumber}
                />
                <InfoRow
                  icon={<CakeIcon sx={{ color: "gray", fontSize: "20px" }} />}
                  label="Birth"
                  value={formatDate(user.dateOfBirth)}
                />
                <InfoRow
                  icon={
                    <EventAvailableIcon
                      sx={{ color: "gray", fontSize: "20px" }}
                    />
                  }
                  label="Appointments"
                  value={`${user.totalAppointments} (Last: ${formatDateTime(
                    user.lastAppointment
                  )})`}
                />
              </Stack>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

const InfoRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <Stack direction="row" spacing={1.5} alignItems="center">
    <Box color="gray" display="flex" alignItems="center">
      {icon}
    </Box>
    <Typography
      variant="body2"
      sx={{ minWidth: 70, fontWeight: 500, color: "#333" }}
    >
      {label}:
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {value}
    </Typography>
  </Stack>
);

export default CustomerCardView;
