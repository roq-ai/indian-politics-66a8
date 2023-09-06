-- CreateTable
CREATE TABLE "guest" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "search_history" TEXT,
    "viewed_profiles" TEXT,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "guest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organization" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "description" VARCHAR(255),
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" UUID NOT NULL,
    "tenant_id" VARCHAR(255) NOT NULL,

    CONSTRAINT "organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "performance_assessment" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "performance_score" INTEGER NOT NULL,
    "demand_score" INTEGER NOT NULL,
    "assessment_date" DATE NOT NULL,
    "politician_id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "performance_assessment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "politician" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "biography" TEXT NOT NULL,
    "current_position" VARCHAR(255) NOT NULL,
    "work_process" TEXT NOT NULL,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "politician_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile_usage" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "daily_usage" INTEGER NOT NULL,
    "weekly_usage" INTEGER NOT NULL,
    "monthly_usage" INTEGER NOT NULL,
    "politician_id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "profile_usage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" VARCHAR(255) NOT NULL,
    "firstName" VARCHAR(255),
    "lastName" VARCHAR(255),
    "roq_user_id" VARCHAR(255) NOT NULL,
    "tenant_id" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "guest" ADD CONSTRAINT "guest_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "organization" ADD CONSTRAINT "organization_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "performance_assessment" ADD CONSTRAINT "performance_assessment_politician_id_fkey" FOREIGN KEY ("politician_id") REFERENCES "politician"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "politician" ADD CONSTRAINT "politician_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "profile_usage" ADD CONSTRAINT "profile_usage_politician_id_fkey" FOREIGN KEY ("politician_id") REFERENCES "politician"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

