import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService  } from '@nestjs/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200' });

@Module ({
    imports: [
        ConfigModule,
        ElasticsearchModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                node: configService.get('ELASTICSEARCH_NODE'),
                maxRetries: 10,
                requestTimeout: 6000,
                auth: {
                    username: configService.get('ELASTICSEARCH_USERNAME'),
                    password: configService.get('ELASTICSEARCH_PASSWORD'),
                }
            }),
            inject: [ConfigService],
        })
    ],
    exports: [ElasticsearchModule],
    controllers: [SearchController],
    providers: [SearchService]
})

export class SearchModule implements OnModuleInit {
    constructor (private readonly searchService: SearchService){}

    public async onModuleInit() {
        await this.searchService.createIndex();
    }
}