export const getStatusText = (status: string) => {
  switch (status.toLowerCase()) {
    case "active":
      return "Активный";
    case "unactive":
      return "Неактивный";
    default:
      return status;
  }
};

export const getLevelText = (level: string) => {
  switch (level.toLowerCase()) {
    case "bronze":
      return "Бронза";
    case "silver":
      return "Серебро";
    case "gold":
      return "Золото";
    default:
      return level;
  }
};
