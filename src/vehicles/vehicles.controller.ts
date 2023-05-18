import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Request,
  UploadedFile,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageUploadSerive } from 'src/imageupload.service';
import { Paginate, PaginateQuery } from 'nestjs-paginate';

@ApiTags('vehicles')
@Controller('vehicles')
export class VehiclesController {
  constructor(
    private readonly vehiclesService: VehiclesService,
    private imageUploadService: ImageUploadSerive,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @UsePipes(ValidationPipe)
  async create(
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
    @Body() createVehicleDto: CreateVehicleDto,
  ) {
    const imageUploadUrl = await this.imageUploadService.uploadImage(
      file?.path,
    );
    return this.vehiclesService.create(createVehicleDto, imageUploadUrl);
  }

  @Get()
  findAll(@Paginate() query: PaginateQuery, @Request() req) {
    return this.vehiclesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehiclesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehiclesService.update(+id, updateVehicleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehiclesService.remove(+id);
  }
}
