import supabase from '../config/supabaseClient.js';

export async function getTrailDetails(req, res) {
    
    try {
        // Fetch trail details from the trails table
        const { data, error } = await supabase
            .from('trails')
            .select('name, description,id');

        if (error) throw error;

        
        // Add a static image URL to each trail
        const trailsWithImages = data.map(trail => ({
            ...trail,
            imageUrl: 'https://media-hosting.imagekit.io//f511187b4077490b/hintersee-3601004_1280.jpg?Expires=1837164860&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=Aull5F7JSOm6ogZbsk-AcSSlD796vAvLzEbHy~k7CJaIAg7f7x79x9CZj68hZNVCMVdp3HqUiiv7sl8lrr16w-OQr4wkbbHVud1Reh9J48F75OEBvoMuTDlJcELvfouxOIeMKvQn7xrdYkhLwrs9PjhtvCWIpESqjeQS0UV~fmyYxTd6k-I64qly1A-EhbGFATZuBKSubA56TKyow8EkF9PQ6iB5Fhrobqtqtx-y4wjSX-t2M0fb1ldipO9~yMWgKKgJBzphv5YyVWBXwmILBDsLOaHdZlZbX7K-G0NsmeDGUDUQDdKrRqVmp8B2ZryVEhJZ1qJhBUn822V4swURnA__' // static image URL
        }));

        return res.status(200).json({
            status: "success",
            data: trailsWithImages,
            message: "Trail details fetched successfully."
        });

    } catch (err) {
        console.error("Error fetching trail details:", err.message);
        return res.status(500).json({ status: "error", message: err.message || "Internal Server Error" });
    }
}
