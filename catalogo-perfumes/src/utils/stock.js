// Stock ficticio (solo para marketing/urgencia), estable por producto: entre 3 y 18 unidades.
export const stockFicticio = (id) => {
  const hash = (id * 2654435761) % 2147483647;
  return 3 + (hash % 16);
};
