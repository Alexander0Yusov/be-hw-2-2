import { ObjectId } from 'mongodb';
// import { PostInputDto } from '../dto/post-input.dto';
import { Comment } from '../types/comment';
import { commentCollection } from '../../db/mongo.db';
import { CommentViewModel } from '../types/comment-view-model';

export const commentsRepository = {
  // async findMany(queryDto: PostQueryInput): Promise<{ items: WithId<Post>[]; totalCount: number }> {
  //   const { pageNumber, pageSize, sortBy, sortDirection } = queryDto;

  //   const skip = (pageNumber - 1) * pageSize;
  //   const filter: any = {};

  //   const items = await postCollection
  //     .find(filter)
  //     .sort({ [sortBy]: sortDirection })
  //     .skip(skip)
  //     .limit(pageSize)
  //     .toArray();

  //   const totalCount = await postCollection.countDocuments(filter);

  //   return { items, totalCount };
  // },

  // async findManyById(id: string, queryDto: PostQueryInput): Promise<{ items: WithId<Post>[]; totalCount: number }> {
  //   const {
  //     pageNumber,
  //     pageSize,
  //     sortBy,
  //     sortDirection,
  //     // searchNameTerm
  //   } = queryDto;

  //   const skip = (pageNumber - 1) * pageSize;
  //   const filter: any = {};

  //   // if (searchNameTerm) {
  //   //   filter.name = { $regex: searchNameTerm, $options: 'i' };
  //   // }

  //   filter.blogId = new ObjectId(id);

  //   const items = await postCollection
  //     .find(filter)
  //     .sort({ [sortBy]: sortDirection })
  //     .skip(skip)
  //     .limit(pageSize)
  //     .toArray();

  //   const totalCount = await postCollection.countDocuments(filter);

  //   return { items, totalCount };
  // },

  // async findById(id: string): Promise<WithId<Post> | null> {
  //   return postCollection.findOne({ _id: new ObjectId(id) });
  // },

  async findById(id: string): Promise<CommentViewModel | null> {
    const foundComment = await commentCollection.findOne({ _id: new ObjectId(id) });

    if (!foundComment) {
      return null;
    }

    return {
      id: foundComment._id.toString(),
      content: foundComment.content,
      commentatorInfo: {
        userId: foundComment.commentatorInfo.userId.toString(),
        userLogin: foundComment.commentatorInfo.userLogin,
      },
      createdAt: foundComment.createdAt,
    };
  },

  async create(comment: Comment): Promise<CommentViewModel> {
    const insertedResult = await commentCollection.insertOne(comment);

    return {
      id: insertedResult.insertedId.toString(),
      content: comment.content,
      commentatorInfo: {
        userId: comment.commentatorInfo.userId.toString(),
        userLogin: comment.commentatorInfo.userLogin,
      },
      createdAt: comment.createdAt,
    };
  },

  // async update(id: string, dto: PostInputDto, blogName: string): Promise<void> {
  //   const updateResult = await postCollection.updateOne(
  //     { _id: new ObjectId(id) },
  //     {
  //       $set: {
  //         title: dto.title,
  //         shortDescription: dto.shortDescription,
  //         content: dto.content,
  //         blogId: new ObjectId(dto.blogId),
  //         blogName,
  //       },
  //     },
  //   );

  //   if (updateResult.matchedCount < 1) {
  //     throw new Error('Post not exist');
  //   }

  //   return;
  // },

  // async delete(id: string): Promise<void> {
  //   const deleteResult = await postCollection.deleteOne({
  //     _id: new ObjectId(id),
  //   });

  //   if (deleteResult.deletedCount < 1) {
  //     throw new Error('Blog not exist');
  //   }
  // },
};
