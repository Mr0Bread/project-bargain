import type { FC } from "react"
import {
	Formik,
	Form,
	Field,
	FieldInputProps
} from 'formik'
import {
	Box,
	VStack,
	FormControl,
	FormLabel,
	chakra
} from '@chakra-ui/react'
import Select from 'react-select'

const ChakraSelect = chakra(Select)

const ApplicationForm: FC = () => (
	<Box>
		<Formik
			initialValues={{}}
			onSubmit={() => undefined}
		>
			{
				() => (
					<Form>
						<VStack>
							<FormControl>
								<FormLabel>
									Application Type
								</FormLabel>
								<Field>
									{
										({ field }: { field: FieldInputProps<unknown> }) => (
											<ChakraSelect
												{...field}
												options={[
													{
														value: 'vehicle',
														label: 'Vehicle'
													},
													{
														value: 'real-estate',
														label: 'Real Estate'
													}
												]}
												styles={{
													control: (provided) => ({
														...provided,
														backgroundColor: 'nonde'
													}),
													menu: (provided) => ({
														...provided,
														backgroundColor: 'none'
													}),
													option: (provided, state) => ({
														...provided,
														backgroundColor: state.isFocused ? 'var(--chakra-colors-gray-700)' : 'none'
													})
												}}
											/>
										)
									}
								</Field>
							</FormControl>
						</VStack>
					</Form>
				)
			}
		</Formik>
	</Box>
)

export default ApplicationForm