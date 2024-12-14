export const createChances = (game: {
  title: string;
  description: string;
  image: string;
  size: string;
  nftAmount?: number;
  commingSoon: boolean;
  prizes: {
    title: string;
    description: string;
    stock: number;
    chance?: number;
    usdtEquivalence: number;
  }[];
}) => {
  const newGame = { ...game };
  const totalPrizesStock = game.prizes.reduce((acc, curr) => {
    return acc + curr.stock;
  }, 0);

  newGame.nftAmount = totalPrizesStock;
  newGame.prizes.map((prize) => {
    prize.chance = (prize.stock / totalPrizesStock) * 100;
    return prize;
  });

  return newGame;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formatReferralsByDate = (referrals: any[]) => {
  // Fecha actual
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const startOfLastMonth = new Date(
    today.getFullYear(),
    today.getMonth() - 1,
    1
  );
  const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);

  // Helper function para comparar solo fechas sin horas
  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  // Helper function para verificar si la fecha está en un rango
  const isBetween = (
    date: number | Date,
    start: number | Date,
    end: number | Date
  ) => {
    return date >= start && date <= end;
  };

  // Clasificación de referencias
  const result: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    today: any[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    yesterday: any[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    thisMonth: any[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    lastMonth: any[];
  } = {
    today: [],
    yesterday: [],
    thisMonth: [],
    lastMonth: [],
  };

  referrals.forEach((referral) => {
    const referralDate = new Date(referral.created_at);

    if (isSameDay(referralDate, today)) {
      result.today.push(referral);
    } else if (isSameDay(referralDate, yesterday)) {
      result.yesterday.push(referral);
    } else if (isBetween(referralDate, startOfMonth, today)) {
      result.thisMonth.push(referral);
    } else if (isBetween(referralDate, startOfLastMonth, endOfLastMonth)) {
      result.lastMonth.push(referral);
    }
  });

  return result;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formatRevenuesByDate = (referrals: any[]) => {
  // Fecha actual
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const startOfLastMonth = new Date(
    today.getFullYear(),
    today.getMonth() - 1,
    1
  );
  const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);

  // Helper function para comparar solo fechas sin horas
  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  // Helper function para verificar si la fecha está en un rango
  const isBetween = (
    date: number | Date,
    start: number | Date,
    end: number | Date
  ) => {
    return date >= start && date <= end;
  };

  // Clasificación de referencias
  const result: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    today: any[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    yesterday: any[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    thisMonth: any[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    lastMonth: any[];
  } = {
    today: [],
    yesterday: [],
    thisMonth: [],
    lastMonth: [],
  };

  referrals.forEach((referral) => {
    const referralDate = new Date(referral.created_at);

    if (isSameDay(referralDate, today)) {
      result.today.push(referral);
    } else if (isSameDay(referralDate, yesterday)) {
      result.yesterday.push(referral);
    } else if (isBetween(referralDate, startOfMonth, today)) {
      result.thisMonth.push(referral);
    } else if (isBetween(referralDate, startOfLastMonth, endOfLastMonth)) {
      result.lastMonth.push(referral);
    }
  });

  return result;
};
