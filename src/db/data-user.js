function getSeedUsers() {
  return [
    {
      firstName: "Brahim",
      lastName: "Benalia",
      email: "brahim@brahim.es",
      password: "123",
      roles: ["Admin"],
    },
  ];
}

module.exports = { getSeedUsers };
