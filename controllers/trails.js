import supabase from '../config/supabaseClient.js';

export async function getTrailDetails(req, res) {
    
    try {
        // Fetch trail details from the trails table
        const { data, error } = await supabase
            .from('trails')
            .select('name, description,id');

        if (error) throw error;

        const imageUrls = [
            'https://media-hosting.imagekit.io//c6be2f189c554a88/tim-stief-YFFGkE3y4F8-unsplash.jpg?Expires=1837166660&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=oHytkUjYQys4RRDj2yxEmSqv1UcMGGDhzzLR24wA2Mwab~EXAVCEl0P6n2gvG1UsUaZKH3hPgeg76nDMMA3zjqTbxIz-4H-BvSJBp3VTn6Nm1ANolxSo61SC6JU~JUnxFetwF43X0T2D~h30YgZ435sbWL2cLg1X0z3X0wPSGLLUMAafXwCEIwFOYX1zS45YT6I98Xt4dFaHOrUSoLE4EeqlfsJjHdcg3VupodvujxpIBI53FONNdo-zHHAiP8AfwFassMYbyMlwPqVwRKCmkvKoPjz~UmcQAlo0h3t4xMEmMRd7F9FZmYQi4nkwFz97LfIBQ833j-zESBFAwrQhMw__',
            'https://media-hosting.imagekit.io//f511187b4077490b/hintersee-3601004_1280.jpg?Expires=1837164860&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=Aull5F7JSOm6ogZbsk-AcSSlD796vAvLzEbHy~k7CJaIAg7f7x79x9CZj68hZNVCMVdp3HqUiiv7sl8lrr16w-OQr4wkbbHVud1Reh9J48F75OEBvoMuTDlJcELvfouxOIeMKvQn7xrdYkhLwrs9PjhtvCWIpESqjeQS0UV~fmyYxTd6k-I64qly1A-EhbGFATZuBKSubA56TKyow8EkF9PQ6iB5Fhrobqtqtx-y4wjSX-t2M0fb1ldipO9~yMWgKKgJBzphv5YyVWBXwmILBDsLOaHdZlZbX7K-G0NsmeDGUDUQDdKrRqVmp8B2ZryVEhJZ1qJhBUn822V4swURnA__',
            'https://media-hosting.imagekit.io//c48e04d7d90340ec/jerry-zhang-hkhCV41gOpA-unsplash.jpg?Expires=1837166561&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=FSE3sSPCMxl6axoRC9-o2vKUKubh8bhFuD-pvR1D3tUJYixwxuf3bDTOPf2K3yEAl4fhlNYMi0Svm0A1gJU7TCarAmPiruNKzWWVvOwWNUV4w4mFQKa2uW7GUH-FMPdndiX6WpofBzXkYN6O0WzVOcj~iYiq-J0-qZb3CEvXxXnb0htZY41ggProdYBXpJRgdjC4XVjaK9iRP7IoQ1H-luzqBK9V0zjW8NFMnI81lgQPp2xc2Siw1RtNGHgKGO6tfBQ2KL4zD1ronk9lgt~-S5ymVwiIYXw3HclG2s9YxK8BWAOld0ZJ1cjdzssUaqCnEWQxJa2GRS1RNWVKvDrewQ__',
            'https://media-hosting.imagekit.io//6528056a5e9f4d50/tree-1715298_1280.jpg?Expires=1837165845&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=E3eYUEAOLodCYLBDZXcAs~rpZs4E5vfXEVxPWXtjAhXI0hQsE2l55hPCULC4ZSnqiFDWMqxPExER3FqBrgKr7m7Ahr-jqOWCZDtPKibNDwH-68HGhithAFEeMAJgfEq2qvGo3Mcb5gcGJVCrFCfoXDAgJsVFMc-YQ~cU~uRjxOtInMfiFPrV2iQdZfyHhY7G7p7qriXuTCGQ7btItx-9Rs30vv~NW7qMTGv3qYo0GGKGFeE1sAOEdohPPvm-BramBtDNn1LqE9dz7fAymETSMPFe1quuUIE2YIHKhWqyMwekLxJRbDEZ0cgRF-vcG7N9p89uo0xK4Y~qttg5KXT9qw__',
            'https://media-hosting.imagekit.io//f5ad663817324e74/jeremy-bishop-dvACrXUExLs-unsplash.jpg?Expires=1837166615&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=oqxgG3-JxqPGBxFNsHoE5dK0OQ2CCLG9pRk3VxvPCVuF7ikW4sLpFJjt2DlD63nEhEhre0ivu5FAMAFRoKTLlOCVj84OFLR2R9PhEanJlNY0kIMIxtLu~bN88cocIMfOoeZfrvq2PNkEebtDm~e~itGs7BdhfAov0LTLUGOw-H7-w0KaWJ6dvoFrLPyLNq0q~vWlXgtbfeedkStNsCyUxuxYxXqEeXTiaRa2Y5xtV0mQA6cfzuJNVI4-zPGKC42ZWfDiRTCX6xApsldePTnb2IR~7gUggLqnCk90VN6MBhGywkdmmrO4GEDV0UGcpu44SDiYcOXp85XTJjve8GQx7Q__'
            // Add more image URLs as needed
        ];
        // Add a static image URL to each trail
        const trailsWithImages = data.map(trail => ({
            ...trail,
            imageUrl: imageUrls[index % imageUrls.length]
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
