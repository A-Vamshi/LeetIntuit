interface SetUpProps {
  setApiKey: (key: string | undefined) => void,
}

interface MainProps {
  apiKey: string,
}

interface GenerateProps {
  slug: string,
  level: string,
  apiKey: string,
}