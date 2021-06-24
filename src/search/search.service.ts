import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class SearchService {
    constructor(private readonly esService: ElasticsearchService, private readonly configService: ConfigService) {}

    async createIndex () {
        const index = this.configService.get('ELASTICSEARCH_INDEX');
        console.log('index:', index)
        const checkIndex = await this.esService.indices.exists({index});

        if(checkIndex.statusCode === 404) {
            this.esService.indices.create({
                index,
                body: {
                    mappings: {
                        properties: {
                            email: {
                                type: 'text',
                                fields: {
                                keyword: {
                                    type: 'keyword',
                                    ignore_above: 256,
                                },
                                },
                            },
                            text: {
                                type: 'text',
                                fields: {
                                keyword: {
                                    type: 'keyword',
                                    ignore_above: 256,
                                },
                                },
                            },
                            title: {
                                type: 'text',
                                fields: {
                                keyword: {
                                    type: 'keyword',
                                    ignore_above: 256,
                                },
                                },
                            },
                        },
                    }
                }
            }), (err) => {
                console.log(err);
            }
        }

        return checkIndex;
    }

    
}
