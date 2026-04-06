/* eslint-disable @typescript-eslint/no-var-requires */
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

/** Lowercased 0x-prefixed address — only for demo rows, not a real custody wallet. */
const DEMO_WALLET = "0x1111111111111111111111111111111111111111";

async function main() {
  const user = await prisma.user.upsert({
    where: { walletAddress: DEMO_WALLET.toLowerCase() },
    update: {
      name: "Demo student (seed)",
    },
    create: {
      walletAddress: DEMO_WALLET.toLowerCase(),
      name: "Demo student (seed)",
      role: "STUDENT",
    },
  });

  await prisma.profile.upsert({
    where: { userId: user.id },
    update: {
      displayName: "Screenshot Student",
      university: "Seed University",
    },
    create: {
      userId: user.id,
      displayName: "Screenshot Student",
      university: "Seed University",
    },
  });

  await prisma.learnProgress.upsert({
    where: {
      userId_lessonId: { userId: user.id, lessonId: "l1" },
    },
    update: { quizBestScore: 100, completedAt: new Date() },
    create: {
      userId: user.id,
      lessonId: "l1",
      quizBestScore: 100,
      completedAt: new Date(),
    },
  });

  await prisma.userBadge.upsert({
    where: { userId_badgeId: { userId: user.id, badgeId: "streak-3" } },
    update: { unlockedAt: new Date() },
    create: {
      userId: user.id,
      badgeId: "streak-3",
    },
  });

  await prisma.savedStrategy.deleteMany({
    where: { userId: user.id, name: "Seed mean-reversion lab" },
  });
  await prisma.savedStrategy.create({
    data: {
      userId: user.id,
      name: "Seed mean-reversion lab",
      templateId: "mean-reversion-eth",
      notes: "Created by prisma/seed.cjs",
      risk: "med",
      timeframe: "1h",
    },
  });

  await prisma.communityComment.deleteMany({
    where: { userId: user.id, strategyId: "cs-mr-eth-1", body: "Example thread comment synced from seed data." },
  });
  await prisma.communityComment.create({
    data: {
      userId: user.id,
      strategyId: "cs-mr-eth-1",
      body: "Example thread comment synced from seed data.",
      score: 0,
    },
  });

  await prisma.auditEvent.create({
    data: {
      userId: user.id,
      path: "/seed",
      eventType: "pocketmate_seed",
      payload: { version: 1 },
    },
  });

  console.info("[seed] PocketMate demo user:", user.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
