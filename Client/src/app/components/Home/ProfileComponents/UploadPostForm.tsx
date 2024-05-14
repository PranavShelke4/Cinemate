import React, { useState, ChangeEvent, FormEvent } from 'react';

function UploadPostForm({ onUpload }: { onUpload: (data: { title: string, image: File }) => void }) {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState<File | null>(null);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onUpload({ title, image: image! }); 
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-gray-800 rounded-lg shadow-lg my-4">
            <div className="mb-4">
                <label className="block text-white mb-2" htmlFor="title">Title</label>
                <input type="text" id="title" value={title} onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} className="w-full p-2 rounded bg-gray-700 text-white" />
            </div>
            <div className="mb-4">
                <label className="block text-white mb-2" htmlFor="image">Image</label>
                <input type="file" id="image" onChange={(e: ChangeEvent<HTMLInputElement>) => setImage(e.target.files?.[0] ?? null)} className="w-full p-2 rounded bg-gray-700 text-white" />
            </div>
            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">Upload Post</button>
        </form>
    );
}

export default UploadPostForm;
