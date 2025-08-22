import { ObjectId } from 'mongodb';
// import { PostInputDto } from '../dto/post-input.dto';
import { Comment } from '../types/comment';
import { commentCollection } from '../../db/mongo.db';
import { CommentViewModel } from '../types/comment-view-model';
import { CommentQueryInput } from '../router/input/blog-query.input';
import { CommentInputDto } from '../dto/comment-input.dto';

export const commentsRepository = {
  async findManyByPostId(id: string, queryDto: CommentQueryInput): Promise<any> {
    const { pageNumber, pageSize, sortBy, sortDirection } = queryDto;

    const skip = (pageNumber - 1) * pageSize;
    const filter: any = {};

    filter.postId = new ObjectId(id);

    const items = await commentCollection
      .find(filter)
      .sort({ [sortBy]: sortDirection })
      .skip(skip)
      .limit(pageSize)
      .toArray();

    const totalCount = await commentCollection.countDocuments(filter);

    const res = {
      pagesCount: Math.ceil(totalCount / pageSize),
      page: pageNumber,
      pageSize,
      totalCount,
      items: items.map(({ _id, content, commentatorInfo, createdAt }) => ({
        id: _id.toString(),
        content,
        commentatorInfo: {
          userId: commentatorInfo.userId.toString(),
          userLogin: commentatorInfo.userLogin,
        },
        createdAt,
      })),
    };

    return res;
  },

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

  async update(id: string, dto: CommentInputDto): Promise<void> {
    const updateResult = await commentCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          content: dto.content,
        },
      },
    );

    if (updateResult.matchedCount < 1) {
      throw new Error('Comment not exist');
    }

    return;
  },

  async delete(id: string): Promise<void> {
    const deleteResult = await commentCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (deleteResult.deletedCount < 1) {
      throw new Error('Comment not exist');
    }
  },
};
