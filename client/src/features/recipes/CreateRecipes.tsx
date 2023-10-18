import { useState } from 'react';
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

import { fetchIngredientData, IngredientSchema } from './Ingredient';

const RecipeSchema = z.object({
  name: z.string().min(5),
  description: z.string().min(1),
  time: z.number().int().nullable(),
  difficulty: z.string(),
  ingredients: z.array(IngredientSchema),
  instructions: z.array(z.string()),
  image: z.instanceof(File).nullable(),
  cost: z.number().nullable()
});

type Recipe = z.infer<typeof RecipeSchema>;

const CreateRecipes = () => {
  const { toast } = useToast();
  const [ingredientQuery, setIngredientQuery] = useState<string>('');
  const [ingredientAmount, setIngredientAmount] = useState<string>('');
  const [data, setData] = useState<Recipe>({
    name: '',
    description: '',
    time: null,
    difficulty: '',
    ingredients: [],
    instructions: [],
    image: null,
    cost: null
  });

  const nutrients = data.ingredients.reduce(
    (prev, curr) => ({ protein: prev.protein + curr.protein_g, calories: prev.calories + curr.calories }),
    {
      protein: 0,
      calories: 0
    }
  );

  const onSubmit = async () => {
    console.log(RecipeSchema.parse(data));
  };

  const updateData = <K extends keyof Recipe>(key: K, value: Recipe[K]) => {
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
          target.files && updateData('image', target.files.item(0));
          target.value = '';
        }}
      />
      <Button variant="secondary" asChild>
        <Label htmlFor="image-upload" className="h-full p-0">
          {data.image ? (
            <img
              className="h-full max-h-40 w-full object-cover object-top "
              alt={data.image.name}
              src={URL.createObjectURL(data.image)}
            />
          ) : (
            <ImagePlus className="my-10" />
          )}
        </Label>
      </Button>
      <div className="flex  flex-col gap-2 p-8 pt-4">
        <Input
          placeholder="Recipe Name"
          value={data.name ?? ''}
          onChange={({ target }) => updateData('name', target.value)}
        />

        <div className="flex flex-row gap-2">
          <div className="flex-shrink flex-grow-[2] basis-0">
            <Textarea
              rows={7}
              value={data.description ?? ''}
              placeholder="Description"
              onChange={({ target }) => updateData('description', target.value)}
            />
          </div>
          <div className="flex flex-1 flex-shrink basis-0 flex-col gap-2">
            <div className="flex flex-row items-center gap-2">
              Time <Clock3 className="h-4" />
            </div>

            <Input
              type="number"
              value={data.time ?? ''}
              onChange={({ target }) => updateData('time', parseInteger(target.value))}
            />

            <span className="flex flex-row items-center gap-2">
              Difficulty
              <Gauge className="h-4" />
            </span>

            <Select onValueChange={value => updateData('difficulty', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Accordion type="multiple">
          <AccordionItem value="item-1">
            <AccordionTrigger>Ingredients</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-2 p-2">
                <div className="flex flex-row items-end justify-evenly gap-2">
                  <div>
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      className="w-14"
                      id="amount"
                      onChange={({ target }) => setIngredientAmount(target.value)}
                      value={ingredientAmount}
                    />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="ingredient">Ingredient</Label>
                    <Input
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
                      <TableRow key={index} className="p-0">
                        <TableCell className="py-2">{ingredient.amount}</TableCell>
                        <TableCell className="py-2" align="center">
                          {ingredient.name}
                        </TableCell>
                        <TableCell className="py-2" align="right">
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
          <AccordionItem value="item-2">
            <AccordionTrigger>Instructions</AccordionTrigger>
            <AccordionContent className="p-2">
              <Textarea
                placeholder="Write the instructions here..."
                value={data.instructions}
                onChange={({ target }) => updateData('instructions', [...data.instructions, target.value])}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Nutrients</AccordionTrigger>
            <AccordionContent className="p-2">
              <div className="flex flex-row flex-wrap justify-evenly gap-2">
                <div>
                  <Label htmlFor="protein">Proteins</Label>
                  <p className="text-center" id="protein">
                    {nutrients.protein.toFixed(1)} g
                  </p>
                </div>
                <div>
                  <Label htmlFor="calories">Calories</Label>
                  <p className="text-center" id="calories">
                    {nutrients.calories.toFixed(0)} kcal
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="flex justify-between">
          <div>
            <Label htmlFor="cost-input">Cost</Label>
            <Input
              id="cost-input"
              type="number"
              value={data.cost ?? ''}
              onChange={({ target }) => updateData('cost', parseDecimal(target.value, 2))}
            />
          </div>
          <Button onClick={onSubmit} variant="outline">
            Upload
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateRecipes;