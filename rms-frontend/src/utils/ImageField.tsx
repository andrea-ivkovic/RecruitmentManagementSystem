import { useFormikContext } from "formik";
import { ChangeEvent, useState } from "react";

export default function ImageField(props: imageFieldProps) {

    const [imageBase64, setImageBase64] = useState('');
    const [imageURL, setImageURL] = useState(props.imageURL);
    const { values } = useFormikContext<any>();

    const [img, setImg] = useState(<img style={{ width: '240px', height: '240px', objectFit: 'scale-down', display: 'block', margin: 'auto', border: '4px solid #88bdbc', borderRadius: '10px' }} src="/no-image-found.png" />);



    const handleOnChange = (eventsArgs: ChangeEvent<HTMLInputElement>) => {
        if (eventsArgs.currentTarget.files) {
            const file = eventsArgs.currentTarget.files[0];
            if (file) {
                toBase64(file)
                    .then((base64Representation: string) => setImageBase64(base64Representation))
                    .catch(error => console.error(error));
                values[props.field] = file;
                setImageURL('');
                setImg(<></>);
            }
            else {
                setImageBase64('');
            }
        }
    }

    const toBase64 = (file: File) => {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);

        })
    }


    return (
        <>

            {imageBase64 ?
                <div>
                    <div >
                        <img style={{ width: '240px', height: '240px', objectFit: 'scale-down', display: 'block', margin: 'auto', border: '4px solid #88bdbc', borderRadius: '10px' }} src={imageBase64} alt="selected" />
                    </div>
                </div> : null}
            {imageURL ?
                <div>
                    <div >
                        <img style={{ width: '240px', height: '240px', objectFit: 'scale-down', display: 'block', margin: 'auto', border: '4px solid #88bdbc', borderRadius: '10px' }} src={imageURL} alt="selected" />
                    </div>
                </div> : img}
            <div>
                <input type="file" accept=".jpg,.jpeg,.png" onChange={handleOnChange} style={{ marginLeft: '40px', textAlignLast: 'center' }} />
            </div>
        </>
    )
}

interface imageFieldProps {
    imageURL: string;
    field: string;
}

ImageField.defaultProps = {
    imageURL: ''
}