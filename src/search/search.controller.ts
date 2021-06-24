import { Controller, Get } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
    constructor(private readonly appService: SearchService) {}

    @Get()
    getHello(): any {
      	return this.appService.createIndex();
    }
}
