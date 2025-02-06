import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const responses = {
  "Kerro tarina": "Kauan sitten Malmin LANeilla, legendaarinen pelaaja nousi esiin...",
  "Anna vinkki": "Älä koskaan aliarvioi vastustajaasi – ja muista pitää taukoja!",
  "Mikä on Malmin lanien salaisuus?": "Sanotaan, että jos voitat kolme turnausta putkeen, pääset Malmin kuningattaren audienssille..."
};

export default function Chatbot() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleQuestion = (question) => {
    setMessage(question);
    setResponse(responses[question]);
  };

  return (
    <Card className="w-96 p-4">
      <CardContent>
        <h2 className="text-xl font-bold">Malmin Kuningatar</h2>
        <p className="text-gray-600 mb-4">Kysy minulta jotain!</p>
        <div className="flex flex-col space-y-2">
          {Object.keys(responses).map((question) => (
            <Button key={question} onClick={() => handleQuestion(question)}>
              {question}
            </Button>
          ))}
        </div>
        {message && (
          <div className="mt-4 p-2 bg-gray-100 rounded">
            <p className="font-semibold">{message}</p>
            <p>{response}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
