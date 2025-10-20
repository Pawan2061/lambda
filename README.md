# Usage Guide - Serverless News Summarizer

This guide explains how to use the **Serverless News Summarizer** deployed on AWS Lambda.

---

## 1. Prepare a News Article URL

Choose any public news article URL, for example:



> Note: Avoid paywalled or live pages, as they may fail to extract text.

---

## 2. Call the Lambda Function

### Using curl

Replace `<LAMBDA_URL>` with your Lambda Function URL (from the Function URL or API Gateway):

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"url":"https://edition.cnn.com/2024/07/10/tech/meta-ai-chatbots-news/index.html"}' \
  <LAMBDA_URL>

```

The response will look like this .
```bash
{
  "summary": "Meta introduced new AI chatbots on its social media platforms..."
}
```


