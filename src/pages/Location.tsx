import { useParams } from "@solidjs/router";
import Card from "../components/Card";

function Location() {
  const params = useParams();

  return (
    <div class="container max-w-3xl mx-auto p-4 flex flex-col gap-4">
      <Card title="Parameters">
        <div>{`ID: ${params.id}`}</div>
      </Card>
    </div>
  );
}

export default Location;
