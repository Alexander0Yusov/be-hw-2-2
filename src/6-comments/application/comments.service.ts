import { ObjectId } from 'mongodb';
import { commentsRepository } from '../repository/comments.repository';
import { Comment } from '../types/comment';
import { CommentInputDto } from '../dto/comment-input.dto';
import { CommentViewModel } from '../types/comment-view-model';

export const commentsService = {
  // async findMany(queryDto: PostQueryInput): Promise<{ items: WithId<Post>[]; totalCount: number }> {
  //   return postsRepository.findMany(queryDto);
  // },

  // async findManyById(id: string, queryDto: PostQueryInput): Promise<{ items: WithId<Post>[]; totalCount: number }> {
  //   return postsRepository.findManyById(id, queryDto);
  // },

  async create(dto: CommentInputDto, userId: string, userLogin: string): Promise<CommentViewModel> {
    const newComment: Comment = {
      content: dto.content,
      commentatorInfo: {
        userId: new ObjectId(userId),
        userLogin,
      },
      createdAt: new Date(),
    };

    return commentsRepository.create(newComment);
  },

  async findById(id: string): Promise<CommentViewModel | null> {
    return commentsRepository.findById(id);
  },

  // async update(id: string, dto: PostInputDto, blogName: string): Promise<void> {
  //   await postsRepository.update(id, dto, blogName);
  //   return;
  // },

  // async delete(id: string): Promise<void> {
  //   await postsRepository.delete(id);
  //   return;
  // },
};
