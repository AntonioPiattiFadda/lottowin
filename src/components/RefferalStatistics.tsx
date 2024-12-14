import { useEffect, useState } from 'react';
import ReferealStatisticsCard from './cards/ReferealStatisticsCard';
import {
  getRefferedUsers,
  getUserByWalletAddress,
  getUserRevenues,
  updateRevenue,
} from '../service';
import { useAccount } from 'wagmi';
import { formatReferralsByDate, formatRevenuesByDate } from '../utils';
import { useBalance } from '../Context/BalanceContext';

const RefferalStatistics = () => {
  const { address } = useAccount();
  const [referralStatistics, setReferralStatistics] = useState({
    today: 0,
    yesterday: 0,
    thisMonth: 0,
    lastMonth: 0,
    total: 0,
  });
  const [revenue, setRevenue] = useState({
    today: 0,
    yesterday: 0,
    thisMonth: 0,
    lastMonth: 0,
    total: 0,
  });

  useEffect(() => {
    if (!address) return;
    getUserByWalletAddress(address).then((res) => {
      const userRevenue = res.user.revenue;
      getUserRevenues(res.user.id)
        .then((res) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const revenuesArray = res.map((revenue: { createdAt: any }) => {
            return {
              ...revenue,
              created_at: revenue.createdAt,
            };
          });
          const revenuesFormatted = formatRevenuesByDate(revenuesArray);
          const todayAmount = revenuesFormatted.today.reduce((acc, revenue) => {
            return acc + revenue.nftAmount;
          }, 0);
          const yesterdayAmount = revenuesFormatted.yesterday.reduce(
            (acc, revenue) => {
              return acc + revenue.nftAmount;
            },
            0
          );
          const thisMonthAmount = revenuesFormatted.thisMonth.reduce(
            (acc, revenue) => {
              return acc + revenue.nftAmount;
            },
            0
          );
          const lastMonthAmount = revenuesFormatted.lastMonth.reduce(
            (acc, revenue) => {
              return acc + revenue.nftAmount;
            },
            0
          );
          setRevenue({
            today: todayAmount * 50,
            yesterday: yesterdayAmount * 50,
            thisMonth: thisMonthAmount * 50,
            lastMonth: lastMonthAmount * 50,
            total: userRevenue,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }, [address]);

  useEffect(() => {
    if (!address) {
      return;
    }
    getRefferedUsers(address)
      .then((referrals) => {
        const refferalsFormatted = formatReferralsByDate([...referrals]);

        setReferralStatistics({
          today: refferalsFormatted.today.length,
          yesterday: refferalsFormatted.yesterday.length,
          thisMonth: refferalsFormatted.thisMonth.length,
          lastMonth: refferalsFormatted.lastMonth.length,
          total:
            refferalsFormatted.today.length +
            refferalsFormatted.yesterday.length +
            refferalsFormatted.thisMonth.length +
            refferalsFormatted.lastMonth.length,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [address]);
  const { balance, updateBalance } = useBalance();

  const handleClaimRevenue = () => {
    if (!address) return;
    getUserByWalletAddress(address).then((res) => {
      const userRevenue = res.user.revenue;
      if (userRevenue < 20) {
        alert('You need at least 20 USDT to claim revenue');
        return;
      }
      updateRevenue(address).then(() => {
        updateBalance(balance + userRevenue);
        setRevenue((prev) => {
          return {
            ...prev,
            total: 0,
          };
        });
      });
    });
  };

  return (
    <div className="border-t-[2px] w-full flex flex-col items-center">
      <span className="text-[white] text-[25px] text-center  mt-12">
        YOUR STATISTICS
      </span>

      <div className="grid  lg:grid-cols-2 lg:gap-10">
        <ReferealStatisticsCard
          refferalsFormatted={referralStatistics}
          title="Referrals"
        />
        <ReferealStatisticsCard
          refferalsFormatted={revenue}
          title="Revenue"
          onClaimRevenue={handleClaimRevenue}
        />
      </div>
    </div>
  );
};

export default RefferalStatistics;
