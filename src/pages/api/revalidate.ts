import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
		if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
			return res.status(401).json({ message: 'Invalid token' });
		}
	
		const body = req.body
		if(!body){
			res.status(400).send("Bad request (no body)")
			return
		}
	
		const slugToRevalidate = body.slugToRevalidate
		if(slugToRevalidate){
			await res.revalidate(`/products/${slugToRevalidate}`)
			await res.revalidate('/');
			return res.json({revalidate: true})
		} 

  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating');
  }
}