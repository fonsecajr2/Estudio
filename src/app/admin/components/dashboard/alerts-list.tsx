'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { alerts } from '@/lib/data';
import { formatDistanceToNow } from 'date-fns';

export function AlertsList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Recent Alerts</CardTitle>
        <CardDescription>A log of all detected operational anomalies.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bus ID</TableHead>
              <TableHead>Alert Type</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {alerts.map((alert) => (
              <TableRow key={alert.id}>
                <TableCell className="font-mono">{alert.busId}</TableCell>
                <TableCell>
                  <Badge variant={alert.type === 'Off Route' || alert.type === 'Communication Failure' ? 'destructive' : 'secondary'}>
                    {alert.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
                </TableCell>
                <TableCell>
                  <Badge variant={alert.resolved ? 'default' : 'outline'} className={alert.resolved ? 'bg-green-600' : ''}>
                    {alert.resolved ? 'Resolved' : 'Active'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" disabled={alert.resolved}>
                    Resolve
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
