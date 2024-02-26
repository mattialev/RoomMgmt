using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RoomMgmtBackend.Migrations
{
    /// <inheritdoc />
    public partial class GuidExtKeyReservation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_Rooms_ReservedRoomRoomID",
                table: "Reservations");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_Users_ReservationOwnerUserID",
                table: "Reservations");

            migrationBuilder.DropIndex(
                name: "IX_Reservations_ReservationOwnerUserID",
                table: "Reservations");

            migrationBuilder.DropIndex(
                name: "IX_Reservations_ReservedRoomRoomID",
                table: "Reservations");

            migrationBuilder.RenameColumn(
                name: "ReservedRoomRoomID",
                table: "Reservations",
                newName: "ReservedRoom");

            migrationBuilder.RenameColumn(
                name: "ReservationOwnerUserID",
                table: "Reservations",
                newName: "ReservationOwner");

            migrationBuilder.AddColumn<Guid>(
                name: "UserID",
                table: "Reservations",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_UserID",
                table: "Reservations",
                column: "UserID");

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_Users_UserID",
                table: "Reservations",
                column: "UserID",
                principalTable: "Users",
                principalColumn: "UserID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_Users_UserID",
                table: "Reservations");

            migrationBuilder.DropIndex(
                name: "IX_Reservations_UserID",
                table: "Reservations");

            migrationBuilder.DropColumn(
                name: "UserID",
                table: "Reservations");

            migrationBuilder.RenameColumn(
                name: "ReservedRoom",
                table: "Reservations",
                newName: "ReservedRoomRoomID");

            migrationBuilder.RenameColumn(
                name: "ReservationOwner",
                table: "Reservations",
                newName: "ReservationOwnerUserID");

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_ReservationOwnerUserID",
                table: "Reservations",
                column: "ReservationOwnerUserID");

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_ReservedRoomRoomID",
                table: "Reservations",
                column: "ReservedRoomRoomID");

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_Rooms_ReservedRoomRoomID",
                table: "Reservations",
                column: "ReservedRoomRoomID",
                principalTable: "Rooms",
                principalColumn: "RoomID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_Users_ReservationOwnerUserID",
                table: "Reservations",
                column: "ReservationOwnerUserID",
                principalTable: "Users",
                principalColumn: "UserID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
