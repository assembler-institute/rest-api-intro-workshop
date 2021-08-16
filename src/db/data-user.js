function getSeedUsers() {
  return [
    {
      firstName: "Brahim",
      lastName: "Benalia",
      email: "brahim@brahim.es",
      // Password: 123
      password: "$2b$10$GVOAlSA4v6h8wteprLFsQuaM9FptKB/DW0L83wGnbClichSY9HP9a",
      roles: ["Admin"],
    },
  ];
}

module.exports = { getSeedUsers };
