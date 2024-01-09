import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";


export const noteRouter = createTRPCRouter({
  

    delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.note.delete({
        where: {
          id: input.id,
        },
      });
    }),


    create: protectedProcedure
    .input(
      z.object({ title: z.string(), content: z.string(), topicId: z.string() })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.note.create({
        data: {
          title: input.title,
          topicId: input.topicId,
          content: input.content,
        },
      });
    }),


    update: protectedProcedure
    .input(z.object({ id: z.string(), title: z.string(), content: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.note.update({
        where: {
          id: input.id,  
        },
        data: {
          title: input.title,
          content: input.content,
        },
      });
    }),
  
  

    getAll: protectedProcedure
    .input(z.object({ topicId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.note.findMany({
        where: {
          topicId: input.topicId,
        },
      });
    }),

});
