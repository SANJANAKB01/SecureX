package com.secureX.SecureX.repository;

import com.secureX.SecureX.Entity.Leaderboard;
import org.springframework.data.jpa.repository.JpaRepository;
public interface LeaderboardRepository extends JpaRepository<Leaderboard, Long> {
}
