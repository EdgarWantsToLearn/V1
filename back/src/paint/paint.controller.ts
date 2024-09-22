import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  // MaxFileSizeValidator,
  FileTypeValidator,
  HttpCode,
  Get,
  Param,
  Query,
  Res,
  Header,
  Patch,
  NotFoundException,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreatePaintDto } from './dto/create-paint.dto';
import { Paint } from './paint.entity';
import { PaintRepository } from './paint.repository';
import { User } from 'src/user/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { GetPaintsQueryDto } from './dto/get-paint-dto';
import { GetPaintImageParamsDto } from './dto/get-paint-image.dto';
import { createReadStream, existsSync } from 'fs';
import { UpdatePaintByIdParams as UpdatePaintByIdParamsDto } from './dto/update-paint-by-id-params.dto';
import { UpdatePaintByIdBodyDto } from './dto/update-paint-by-id-body.dto';

const storage = diskStorage({
  destination: './paints',
  filename: (req, file, cb) => {
    const extension = extname(file.originalname);
    cb(null, `${req.params.id}${extension}`);
  },
});

@Controller('paints')
export class PaintController {
  constructor(private readonly paintRepository: PaintRepository) {}

  @UseGuards(AuthGuard)
  @Get()
  async get(@Query() query: GetPaintsQueryDto): Promise<Paint[]> {
    return this.paintRepository.find(query);
  }

  @UseGuards(AuthGuard)
  @HttpCode(201)
  @Post()
  async create(
    @Body() body: CreatePaintDto,
    @Request() req: any,
  ): Promise<Paint> {
    const user: User = req.user;
    console.log('body =', body);
    const paint = await this.paintRepository.insertOne({ ...body, user });

    // @ts-expect-error user must be removed
    delete paint.user;

    return paint;
  }

  @UseGuards(AuthGuard)
  @Patch('/:id')
  async updateById(
    @Param() params: UpdatePaintByIdParamsDto,
    @Body() body: UpdatePaintByIdBodyDto,
  ): Promise<Paint> {
    const paint = await this.paintRepository.updateById(params.id, body);

    if (paint === null) {
      throw new NotFoundException(`Paint#${params.id} not found`);
    }

    return paint;
  }

  @UseGuards(AuthGuard)
  @Post('/:id/upload-image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage,
    }),
  )
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // new MaxFileSizeValidator({ maxSize: 500000 }),
          new FileTypeValidator({ fileType: /image\/(png)/ }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return file; // TODO: check paint exist
  }

  @Get('/:id/image')
  @Header('content-type', 'image/png')
  async getPaintImage(
    @Param() params: GetPaintImageParamsDto,
    @Res() res: Response,
  ) {
    const filePath = join(
      __dirname,
      '..',
      '..',
      '..',
      'paints',
      `${params.id}.png`,
    );
    const filename = existsSync(filePath)
      ? params.id.toLocaleString()
      : 'default';

    const file = createReadStream(
      join(process.cwd(), `paints/${filename}.png`),
    );
    file.pipe(res as any);
  }
}
