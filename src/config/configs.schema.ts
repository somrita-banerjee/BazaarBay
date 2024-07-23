export const configsSchema = () => ({
  SYSTEM: {
    PORT: parseInt(process.env.port, 10),
  },
});
