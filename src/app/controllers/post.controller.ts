import { IPost } from '@models/post';
import { NextFunction, Request, Response } from 'express';
import { Body, Controller, Delete, Get, Param, Patch, Post, Res, UseBefore } from 'routing-controllers';
import { Service } from 'typedi';
import { PostService } from '@services/post.service';

@Controller('/posts')
@UseBefore((_req: Request, _res: Response, next: NextFunction) => {
  console.log('controller-wide middlewares here.');
  next();
})
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
  @UseBefore((_req: Request, _res: Response, next: NextFunction) => {
    console.log('route-specific middlewares here.');
    next();
  })
  public async create(@Body() body: IPost, @Res() res: Response) {
    const data = await this.postService.create({
      title: body.title,
      content: body.content,
    });

    return res.status(201).json({ data });
  }

  @Patch('/:id')
  public async update(
    @Param('id') id: string,
    @Body() body: Partial<IPost>,
    @Res() res: Response,
  ) {
    const data = await this.postService.updateById(id, {
      title: body.title ?? undefined,
      content: body.content ?? undefined,
    });

    return res.status(200).json({ data });
  }

  @Delete('/:id')
  public async delete(@Param('id') id: string, @Res() res: Response) {
    const data = await this.postService.deleteById(id);

    return res.status(200).json({ data });
  }
}
