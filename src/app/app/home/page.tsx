import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Mock data for churches (replace with actual data fetching logic)
const churches = [
  { id: 1, name: "St. Mary's Cathedral", location: 'New York, NY' },
  { id: 2, name: 'Grace Community Church', location: 'Los Angeles, CA' },
  { id: 3, name: 'Holy Trinity Church', location: 'Chicago, IL' },
  { id: 4, name: 'First Baptist Church', location: 'Houston, TX' },
];

export default function ChurchesPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold mb-6">My Churches</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {churches.map((church) => (
          <Card key={church.id} className="overflow-hidden">
            <CardHeader className="bg-gray-100">
              <CardTitle>{church.name}</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-gray-600 mb-4">{church.location}</p>
              <Button variant="outline">View Details</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
