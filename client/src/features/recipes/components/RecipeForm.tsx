import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Clock3, Gauge, ImagePlus, Trash2 } from 'lucide-react';
import { z } from 'zod';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/common/components/Accordion';
import { Button } from '@/common/components/Button';
import { Input } from '@/common/components/Input';
import { Label } from '@/common/components/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/common/components/Select';
import { Table, TableBody, TableCell, TableRow } from '@/common/components/Table';
import { Textarea } from '@/common/components/TextArea';
import { useToast } from '@/common/components/use-toast';
import { parseDecimal, parseInteger } from '@/common/utils/formUtils';
import config from '@/config';

import { fetchIngredientData, IngredientSchema } from '../Ingredient';
import { Recipe, RecipeRequest } from '../RecipeContext';

export const RecipeRequestSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string(),
  time: z.number().int().nullable(),
  difficulty: z.string(),
  ingredients: IngredientSchema.array(),
  instructions: z.string(),
  image: z.instanceof(File).nullable(),
  cost: z.number().nullable()
});

type RecipeFormProps = {
  recipe?: Recipe;
  handleSubmit: (data: RecipeRequest) => Promise<void>;
};

const RecipeForm = ({ recipe, handleSubmit }: RecipeFormProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [ingredientQuery, setIngredientQuery] = useState<string>('');
  const [ingredientAmount, setIngredientAmount] = useState<string>('');
  const [data, setData] = useState<RecipeRequest>({
    name: recipe?.name ?? '',
    description: recipe?.description ?? '',
    time: recipe?.time ?? null,
    difficulty: recipe?.difficulty ?? '',
    ingredients: recipe?.ingredients ?? [],
    instructions: recipe?.instructions ?? '',
    image: null,
    cost: recipe?.cost ?? null
  });
  const [imageData, setImageData] = useState<{ name: string; url: string } | null>(null);
  const nutrients = data.ingredients.reduce(
    (prev, curr) => ({ protein: prev.protein + curr.protein, calories: prev.calories + curr.calories }),
    {
      protein: 0,
      calories: 0
    }
  );
  useEffect(() => {
    if (recipe?.image) {
      setImageData({ name: recipe.name, url: `${config.baseUrl}/uploads/${recipe.image}` });
    }
  }, [recipe]);

  const onSubmit = async () => {
    try {
      const payload = RecipeRequestSchema.parse(data);
      await handleSubmit(payload);
      toast({ title: `Recipe ${recipe ? 'updated' : 'created'} successfully!` });
      navigate('/recipes');
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: 'Error',
          description: error.issues.map(value => value.message).join('\n'),
          variant: 'destructive'
        });
      } else {
        console.error(error);
      }
    }
  };

  const updateData = <K extends keyof RecipeRequest>(key: K, value: RecipeRequest[K]) => {
    setData(prevState => ({ ...prevState, [key]: value }));
  };

  const addIngredient = async () => {
    try {
      const newIngredient = await fetchIngredientData(ingredientAmount, ingredientQuery);
      updateData('ingredients', [...data.ingredients, newIngredient]);
      setIngredientQuery('');
      setIngredientAmount('');
    } catch (error) {
      toast({ title: String(error), variant: 'destructive' });
    }
  };
  return (
    <div className="flex w-full flex-col">
      <input
        id="image-upload"
        type="file"
        className="hidden"
        accept="image/*"
        onChange={({ target }) => {
          console.log(target.files && 'je');
          const image = target.files?.item(0);
          if (image) {
            updateData('image', image);
            setImageData({ name: image.name, url: URL.createObjectURL(image) });
          } else {
            setImageData(null);
          }
          target.value = '';
        }}
      />
      <Button variant="secondary" className="" asChild>
        <Label htmlFor="image-upload" className="h-fit p-0">
          {imageData ? (
            <img
              className="aspect-video w-full bg-stone-100 object-contain object-top"
              alt={imageData.name}
              src={imageData.url}
            />
          ) : (
            <div className="flex aspect-video w-full items-center justify-center bg-stone-100">
              <ImagePlus className="h-1/5 w-1/5" />
            </div>
          )}
        </Label>
      </Button>
      <div className="flex flex-col gap-2 p-4 pt-4 text-base ">
        <Input
          className="mb-2 border-[1px] border-black font-alegreya text-base placeholder:italic"
          placeholder="Recipe Name"
          value={data.name ?? ''}
          onChange={({ target }) => updateData('name', target.value)}
        />

        <div className="flex flex-row gap-4">
          <div className="flex-shrink flex-grow-[2] basis-0">
            <Textarea
              rows={6}
              className="border-[1px] border-black font-alegreya text-base placeholder:italic"
              value={data.description ?? ''}
              placeholder="Description"
              onChange={({ target }) => updateData('description', target.value)}
            />
          </div>
          <div className="flex min-w-[80px] flex-1 flex-shrink basis-0 flex-col justify-between gap-2">
            <div>
              <div className="mb-2 flex flex-row items-center gap-1 font-alegreya">
                <Clock3 className="h-4" />
                Time
              </div>

              <Input
                type="number"
                className="border-[1px] border-black font-alegreya text-base"
                value={data.time ?? ''}
                onChange={({ target }) => updateData('time', parseInteger(target.value))}
              />
            </div>

            <div>
              <span className="mb-2 flex flex-row items-center gap-1 font-alegreya">
                <Gauge className="h-4" /> Difficulty
              </span>

              <Select value={data.difficulty} onValueChange={value => updateData('difficulty', value)}>
                <SelectTrigger className="border-[1px] border-black font-alegreya text-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="w-fit font-alegreya">
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <Accordion type="multiple" defaultValue={['ingredients', 'nutrients', 'instructions']}>
          <AccordionItem value="ingredients">
            <AccordionTrigger className="font-alegreya text-lg font-bold">Ingredients</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-2 px-4">
                <div className="flex flex-row items-end justify-evenly gap-3">
                  <div className="overflow-visible">
                    <Label className="font-alegreya text-base" htmlFor="amount">
                      Amount
                    </Label>
                    <Input
                      className="w-14 border-[1px] border-black font-alegreya text-base"
                      id="amount"
                      onChange={({ target }) => setIngredientAmount(target.value)}
                      value={ingredientAmount}
                    />
                  </div>
                  <div className="flex-1">
                    <Label className="font-alegreya text-base" htmlFor="ingredient">
                      Ingredient
                    </Label>
                    <Input
                      className="border-[1px] border-black font-alegreya text-base placeholder:italic"
                      id="ingredient"
                      onChange={({ target }) => setIngredientQuery(target.value)}
                      value={ingredientQuery}
                      placeholder="Type a ingredient"
                    />
                  </div>
                  <Button onClick={addIngredient}>Add</Button>
                </div>
                <Table>
                  <TableBody>
                    {data.ingredients.map((ingredient, index) => (
                      <TableRow key={index} className="p-0 font-alegreya text-base">
                        <TableCell className="min-w-[56px] p-0 py-2 pl-2">{ingredient.amount}</TableCell>
                        <TableCell className="w-full p-0 py-2 pl-6 capitalize">{ingredient.name}</TableCell>
                        <TableCell className="p-0 py-2" align="right">
                          <Button
                            variant="ghost"
                            className="h-full"
                            onClick={() =>
                              updateData(
                                'ingredients',
                                data.ingredients.filter((_, i) => i !== index)
                              )
                            }>
                            <Trash2 className="h-6" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="nutrients">
            <AccordionTrigger className="font-alegreya text-lg font-bold">Nutrients</AccordionTrigger>
            <AccordionContent className="px-4 pt-1">
              <div className="flex flex-col">
                <div className="flex justify-between">
                  <Label className="font-alegreya text-base" htmlFor="protein">
                    Proteins
                  </Label>
                  <div className="font-alegreya text-base" id="protein">
                    {nutrients.protein.toFixed(2)} g
                  </div>
                </div>
                <div className="flex justify-between">
                  <Label className="font-alegreya text-base" htmlFor="calories">
                    Calories
                  </Label>
                  <div className="font-alegreya text-base" id="calories">
                    {nutrients.calories.toFixed(2)} kcal
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <div className="flex flex-row gap-3 pb-1 pt-6">
            <Label
              className="flex w-fit items-center justify-center text-center align-middle font-alegreya text-lg font-bold"
              htmlFor="cost-input break-keep">
              Cost
            </Label>
            <Input
              id="cost-input"
              className="mr-4 border-[1px] border-black font-alegreya text-base"
              type="number"
              value={data.cost ?? ''}
              onChange={({ target }) => updateData('cost', parseDecimal(target.value, 2))}
            />
          </div>
          <AccordionItem value="instructions">
            <AccordionTrigger className="font-alegreya text-lg font-bold">Instructions</AccordionTrigger>
            <AccordionContent className="px-4 pt-1">
              <Textarea
                className="border-[1px] border-black font-alegreya text-base placeholder:italic"
                placeholder="Write the instructions here..."
                value={data.instructions}
                onChange={({ target }) => updateData('instructions', target.value)}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="mb-6 mt-4 flex justify-end gap-4">
          <Button variant="outline" className="w-20" asChild>
            <Link to="../">Cancel</Link>
          </Button>
          <Button onClick={onSubmit} className="w-20">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecipeForm;
