-- AlterTable
ALTER TABLE "Achievement" ALTER COLUMN "index" DROP NOT NULL,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "imageURL" DROP NOT NULL,
ALTER COLUMN "gameId" DROP NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Game" ALTER COLUMN "gameId" DROP NOT NULL,
ALTER COLUMN "playTime" DROP NOT NULL,
ALTER COLUMN "totalAchievements" DROP NOT NULL,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "imageURL" DROP NOT NULL;

-- AlterTable
ALTER TABLE "History" ALTER COLUMN "type" DROP NOT NULL,
ALTER COLUMN "gameId" DROP NOT NULL,
ALTER COLUMN "playTime" DROP NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "PatreonInfo" ALTER COLUMN "tier" DROP NOT NULL,
ALTER COLUMN "amount" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "avatar" DROP NOT NULL,
ALTER COLUMN "location" DROP NOT NULL,
ALTER COLUMN "xp" DROP NOT NULL,
ALTER COLUMN "patreonInfoId" DROP NOT NULL,
ALTER COLUMN "googleId" DROP NOT NULL;
