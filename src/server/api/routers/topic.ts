import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

// Define a Zod schema for your input data
const CreateTopicInput = z.object({
  title: z.string(),
});

export const topicRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.topic.findMany({
      where: { 
        userId: ctx.session.user.id,
      }
    });
  }),

  create: protectedProcedure
    .input(CreateTopicInput)
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.topic.create({
        data: {
          title: input.title,
          userId: ctx.session.user.id,
        },
      });
    }),
});
