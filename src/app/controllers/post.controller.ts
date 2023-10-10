import { AuthRequest, JwtAuthMiddleware } from '@middlewares/jwt-auth.middleware';
import { IPost } from '@models/post';
import { Response } from 'express';
import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Res, UseBefore } from 'routing-controllers';
import { Service } from 'typedi';
import { PostService } from '@services/post.service';

@Controller('/posts')
@Service()
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  public async findAll(@Res() res: Response) {
    const data = await this.postService.findAll();

    return res.status(200).json({ data });
  }

  @Get('/:id')
  public async findById(@Param('id') id: string, @Res() res: Response) {
    const data = await this.postService.findById(id);

    return res.status(200).json({ data });
  }

  @Post()
  @UseBefore(JwtAuthMiddleware)
  public async create(@Req() req: AuthRequest, @Body() body: IPost, @Res() res: Response) {
    await this.postService.create({
      title: body.title,
      content: body.content,
      authorId: req.user.id,
    });

    return res.status(201).json({ message: 'Post created successfully.' });
  }

  @Patch('/:id')
  @UseBefore(JwtAuthMiddleware)
  public async update(
    @Param('id') id: string,
    @Body() body: Partial<IPost>,
    @Res() res: Response,
  ) {
    await this.postService.updateById(id, {
      title: body.title ?? undefined,
      content: body.content ?? undefined,
    });

    return res.status(200).json({ message: 'Post updated successfully.' });
  }

  @Delete('/:id')
  @UseBefore(JwtAuthMiddleware)
  public async delete(@Param('id') id: string, @Res() res: Response) {
    await this.postService.deleteById(id);

    return res.status(200).json({ message: 'Post deleted successfully.' });
  }
}
