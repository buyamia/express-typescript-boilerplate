import { Request, Response } from 'express';

import { Controller, Delete, Get, Patch, Post } from '@lib/router';
import { PostService } from '@services/post.service';

@Controller({
  path: 'posts',
  middlewares: [
    (_req, _res, next) => {
      console.log('controller-wide middlewares here.');
      next();
    },
  ],
})
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  public async findAll(_: Request, res: Response) {
    const data = await this.postService.findAll();

    res.status(200).json({ data });
  }

  @Get(':id')
  public async findById(req: Request, res: Response) {
    const data = await this.postService.findById(req.params.id);

    res.status(200).json({ data });
  }

  @Post({
    middlewares: [
      (_req, _res, next) => {
        console.log('route-specific middlewares here.');
        next();
      },
    ],
  })
  public async create(req: Request, res: Response) {
    const data = await this.postService.create({
      title: req.body.title as string,
      content: req.body.content as string,
    });

    res.status(201).json({ data });
  }

  @Patch(':id')
  public async update(req: Request, res: Response) {
    const data = await this.postService.updateById(req.params.id, {
      title: req.body.title ?? undefined,
      content: req.body.content ?? undefined,
    });

    res.status(200).json({ data });
  }

  @Delete(':id')
  public async delete(req: Request, res: Response) {
    const data = await this.postService.deleteById(req.params.id);

    res.status(200).json({ data });
  }
}
