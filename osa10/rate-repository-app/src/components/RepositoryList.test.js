import { render, screen, waitFor } from '@testing-library/react-native';
import RepositoryList from './RepositoryList';
import { MockedProvider } from "@apollo/client/testing";
import { GET_REPOSITORIES } from "../graphql/queries";

describe('RepositoryList', () => {
    describe('RepositoryListContainer', () => {
      it('renders repository information correctly', async () => {
        const mocks = [
            {
                request: {
                    query: GET_REPOSITORIES
                },
                result: {
                    data: {
                        repositories: {
                            totalCount: 8,
                        pageInfo: {
                            hasNextPage: true,
                            endCursor:
                            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
                            startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
                        },
                        edges: [
                            {
                            node: {
                                id: 'jaredpalmer.formik',
                                fullName: 'jaredpalmer/formik',
                                description: 'Build forms in React, without the tears',
                                language: 'TypeScript',
                                forksCount: 1619,
                                stargazersCount: 21856,
                                ratingAverage: 88,
                                reviewCount: 3,
                                ownerAvatarUrl:
                                'https://avatars2.githubusercontent.com/u/4060187?v=4',
                            },
                            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
                            },
                            {
                            node: {
                                id: 'async-library.react-async',
                                fullName: 'async-library/react-async',
                                description: 'Flexible promise-based React data loader',
                                language: 'JavaScript',
                                forksCount: 69,
                                stargazersCount: 1760,
                                ratingAverage: 72,
                                reviewCount: 3,
                                ownerAvatarUrl:
                                'https://avatars1.githubusercontent.com/u/54310907?v=4',
                            },
                            cursor:
                                'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
                            },
                        ],
                        }
                    }
                }
            }
        ]
        
        
  
        render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <RepositoryList />
        </MockedProvider>
        );

        await waitFor(() => {
            const repositoryItems = screen.queryAllByTestId('repositoryItem');
            expect(repositoryItems.length).toBe(2);
            expect(repositoryItems[0]).toHaveTextContent(mocks[0].result.data.repositories.edges[0].node.fullName);
            expect(repositoryItems[1]).toHaveTextContent(mocks[0].result.data.repositories.edges[1].node.fullName);
        })
      });
    });
  });