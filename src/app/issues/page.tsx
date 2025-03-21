import React from 'react';
import Link from 'next/link';
import { Button, Table } from "@radix-ui/themes"
import prisma from '../../../prisma/client';;
import IssueStatusBadge from '../components/issueStatusBadge';
import delay from "delay";
import IssuesActions from './IssuesActions';

const IssuesPage =  async () => {
   const issue = await prisma.issue.findMany();
   await delay(2000);
    return (
        <div>
            <IssuesActions />
            <Table.Root variant="surface">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='hidden md:table-cell'>Created</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {issue.map(issue =>(
                        <Table.Row key= {issue.id}>
                            <Table.Cell>
                                {issue.title}
                                <div className='block md:hidden'>
                                    <IssueStatusBadge status={issue.status} />
                                   </div>
                                </Table.Cell>
                            <Table.Cell  className='hidden md:table-cell'>
                                 <IssueStatusBadge status={issue.status} />
                                 </Table.Cell>
                            <Table.Cell  className='hidden md:table-cell'>{issue.created.toDateString()}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </div>

    )
}

export default IssuesPage